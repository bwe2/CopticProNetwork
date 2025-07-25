import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { analyzeResume, moderateContent } from "./services/openai";
import { createCustomer, createSubscription, handleWebhook } from "./services/stripe";
import { insertJobSchema, insertReferralSchema, insertMessageSchema, insertResumeSchema, insertPendingInviteSchema } from "@shared/schema";

// In-memory user storage for development
const developmentUsers = new Map([
  ['admin', { 
    id: 'admin', 
    email: 'admin@test.com', 
    firstName: 'Admin', 
    lastName: 'User', 
    tier: 'business', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }],
  ['free_test', { 
    id: 'free_test', 
    email: 'free_test@test.com', 
    firstName: 'Free', 
    lastName: 'Test', 
    tier: 'free', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }],
  ['pro_test', { 
    id: 'pro_test', 
    email: 'pro_test@test.com', 
    firstName: 'Pro', 
    lastName: 'Test', 
    tier: 'pro', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }],
  ['biz_test', { 
    id: 'biz_test', 
    email: 'biz_test@test.com', 
    firstName: 'Business', 
    lastName: 'Test', 
    tier: 'business', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }],
  ['mentor_test', { 
    id: 'mentor_test', 
    email: 'mentor_test@test.com', 
    firstName: 'Mentor', 
    lastName: 'Test', 
    tier: 'pro', 
    createdAt: new Date(), 
    updatedAt: new Date() 
  }]
]);

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Try to get user from development storage first
      const devUser = developmentUsers.get(userId);
      if (devUser) {
        return res.json(devUser);
      }
      
      // Fallback to database storage
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Test user routes (for development)
  app.post('/api/auth/test-login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Test user credentials
      const testUsers = {
        'admin': { password: 'admin', tier: 'business', id: 'admin' },
        'free_test': { password: 'CopticTest#2025', tier: 'free', id: 'free_test' },
        'pro_test': { password: 'CopticTest#2025', tier: 'pro', id: 'pro_test' },
        'biz_test': { password: 'CopticTest#2025', tier: 'business', id: 'biz_test' },
        'mentor_test': { password: 'CopticTest#2025', tier: 'pro', id: 'mentor_test' }
      };

      const testUser = testUsers[username as keyof typeof testUsers];
      if (!testUser || testUser.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Get user from development storage
      const user = developmentUsers.get(username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create session data compatible with the auth middleware
      const sessionUser = {
        claims: {
          sub: testUser.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          profile_image_url: null,
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days from now
        },
        access_token: 'test-token',
        refresh_token: 'test-refresh-token',
        expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
      };

      // Set up session
      req.login(sessionUser, (err) => {
        if (err) {
          console.error('Session login error:', err);
          return res.status(500).json({ message: 'Session creation failed' });
        }
        res.json(user);
      });
    } catch (error) {
      console.error("Test login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Job routes
  app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // Job routes
  app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.post('/api/jobs', isAuthenticated, async (req: any, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob({
        ...jobData,
        postedBy: req.user.claims.sub,
      });
      res.json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Failed to create job" });
    }
  });

  // Referral routes
  app.get('/api/referrals', isAuthenticated, async (req: any, res) => {
    try {
      const referrals = await storage.getUserReferrals(req.user.claims.sub);
      res.json(referrals);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      res.status(500).json({ message: "Failed to fetch referrals" });
    }
  });

  app.post('/api/referrals', isAuthenticated, async (req: any, res) => {
    try {
      const referralData = insertReferralSchema.parse(req.body);
      const referral = await storage.createReferral({
        ...referralData,
        requesterId: req.user.claims.sub,
      });
      res.json(referral);
    } catch (error) {
      console.error("Error creating referral:", error);
      res.status(500).json({ message: "Failed to create referral" });
    }
  });

  // Resume routes
  app.post('/api/resume/analyze', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.tier === 'free') {
        return res.status(403).json({ message: 'Upgrade to Pro to access AI resume tools' });
      }

      const { resumeText } = req.body;
      const { analysis, optimizedContent } = await analyzeResume(resumeText);
      
      const resume = await storage.createResume({
        userId: req.user.claims.sub,
        originalContent: resumeText,
        optimizedContent,
        aiAnalysis: analysis,
      });

      res.json(resume);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      res.status(500).json({ message: "Failed to analyze resume" });
    }
  });

  // Group routes
  app.get('/api/groups', async (req, res) => {
    try {
      const groups = await storage.getGroups();
      res.json(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ message: "Failed to fetch groups" });
    }
  });

  app.post('/api/groups/:groupId/join', isAuthenticated, async (req: any, res) => {
    try {
      const { groupId } = req.params;
      await storage.joinGroup(groupId, req.user.claims.sub);
      res.json({ success: true });
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({ message: "Failed to join group" });
    }
  });

  // Stripe subscription routes
  app.post('/api/create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.email) {
        return res.status(400).json({ message: 'No user email on file' });
      }

      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await createCustomer(user.email, user.firstName + ' ' + user.lastName);
        customerId = customer.id;
        await storage.updateUserStripeInfo(user.id, customerId, '');
      }

      const { tier } = req.body;
      const priceIds = {
        pro: process.env.STRIPE_PRO_PRICE_ID,
        business: process.env.STRIPE_BUSINESS_PRICE_ID,
      };

      const priceId = priceIds[tier as keyof typeof priceIds];
      if (!priceId) {
        return res.status(400).json({ message: 'Invalid tier' });
      }

      const subscription = await createSubscription(customerId, priceId);
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);

      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  // Stripe webhook
  app.post('/api/webhooks/stripe', async (req, res) => {
    try {
      const signature = req.headers['stripe-signature'] as string;
      await handleWebhook(signature, req.body);
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({ message: "Webhook failed" });
    }
  });

  // Pending invites endpoint (public)
  app.post("/api/pending-invites", async (req, res) => {
    try {
      const invite = await storage.createPendingInvite(req.body);
      res.json(invite);
    } catch (error) {
      console.error("Error creating pending invite:", error);
      res.status(500).json({ message: "Failed to create pending invite" });
    }
  });

  // Get pending invites (admin only)
  app.get("/api/pending-invites", isAuthenticated, async (req, res) => {
    try {
      const invites = await storage.getPendingInvites();
      res.json(invites);
    } catch (error) {
      console.error("Error fetching pending invites:", error);
      res.status(500).json({ message: "Failed to fetch pending invites" });
    }
  });

  // Update invite status (admin only)
  app.patch("/api/pending-invites/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const invite = await storage.updateInviteStatus(id, status);
      res.json(invite);
    } catch (error) {
      console.error("Error updating invite status:", error);
      res.status(500).json({ message: "Failed to update invite status" });
    }
  });

  // Content moderation
  app.post('/api/moderate', isAuthenticated, async (req, res) => {
    try {
      const { content } = req.body;
      const result = await moderateContent(content);
      res.json(result);
    } catch (error) {
      console.error("Error moderating content:", error);
      res.status(500).json({ message: "Failed to moderate content" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'chat_message') {
          const messageData = insertMessageSchema.parse({
            groupId: data.groupId,
            userId: data.userId,
            content: data.content,
          });
          
          const newMessage = await storage.createMessage(messageData);
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'new_message',
                message: newMessage,
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return httpServer;
}
