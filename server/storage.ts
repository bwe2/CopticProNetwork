import {
  users,
  groups,
  jobs,
  referrals,
  messages,
  resumes,
  notifications,
  pendingInvites,
  type User,
  type UpsertUser,
  type Group,
  type InsertGroup,
  type Job,
  type InsertJob,
  type Referral,
  type InsertReferral,
  type Message,
  type InsertMessage,
  type Resume,
  type InsertResume,
  type Notification,
  type InsertNotification,
  type PendingInvite,
  type InsertPendingInvite,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  updateUserTier(userId: string, tier: "free" | "pro" | "business"): Promise<User>;
  
  // Group operations
  createGroup(group: InsertGroup): Promise<Group>;
  getGroups(): Promise<Group[]>;
  getUserGroups(userId: string): Promise<Group[]>;
  joinGroup(groupId: string, userId: string): Promise<void>;
  
  // Job operations
  createJob(job: InsertJob): Promise<Job>;
  getJobs(): Promise<Job[]>;
  getJobsByIndustry(industry: string): Promise<Job[]>;
  
  // Referral operations
  createReferral(referral: InsertReferral): Promise<Referral>;
  getUserReferrals(userId: string): Promise<Referral[]>;
  updateReferralStatus(referralId: string, status: string): Promise<Referral>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getGroupMessages(groupId: string): Promise<Message[]>;
  
  // Resume operations
  createResume(resume: InsertResume): Promise<Resume>;
  getUserResume(userId: string): Promise<Resume | undefined>;
  updateResume(resumeId: string, updates: Partial<Resume>): Promise<Resume>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  
  // Pending invite operations
  createPendingInvite(invite: InsertPendingInvite): Promise<PendingInvite>;
  getPendingInvites(): Promise<PendingInvite[]>;
  updateInviteStatus(inviteId: string, status: string): Promise<PendingInvite>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserTier(userId: string, tier: "free" | "pro" | "business"): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        tier,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Group operations
  async createGroup(group: InsertGroup): Promise<Group> {
    const [newGroup] = await db.insert(groups).values(group).returning();
    return newGroup;
  }

  async getGroups(): Promise<Group[]> {
    return await db.select().from(groups).where(eq(groups.isActive, true));
  }

  async getUserGroups(userId: string): Promise<Group[]> {
    const result = await db
      .select({
        id: groups.id,
        name: groups.name,
        description: groups.description,
        type: groups.type,
        church: groups.church,
        industry: groups.industry,
        isActive: groups.isActive,
        memberCount: groups.memberCount,
        createdBy: groups.createdBy,
        createdAt: groups.createdAt,
      })
      .from(groups)
      .innerJoin(
        sql`group_memberships`,
        sql`groups.id = group_memberships.group_id`
      )
      .where(sql`group_memberships.user_id = ${userId}`);
    return result;
  }

  async joinGroup(groupId: string, userId: string): Promise<void> {
    await db.execute(
      sql`INSERT INTO group_memberships (group_id, user_id) VALUES (${groupId}, ${userId})`
    );
  }

  // Job operations
  async createJob(job: InsertJob): Promise<Job> {
    const [newJob] = await db.insert(jobs).values(job).returning();
    return newJob;
  }

  async getJobs(): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.isActive, true)).orderBy(desc(jobs.createdAt));
  }

  async getJobsByIndustry(industry: string): Promise<Job[]> {
    return await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.industry, industry), eq(jobs.isActive, true)))
      .orderBy(desc(jobs.createdAt));
  }

  // Referral operations
  async createReferral(referral: InsertReferral): Promise<Referral> {
    const [newReferral] = await db.insert(referrals).values(referral).returning();
    return newReferral;
  }

  async getUserReferrals(userId: string): Promise<Referral[]> {
    return await db
      .select()
      .from(referrals)
      .where(eq(referrals.requesterId, userId))
      .orderBy(desc(referrals.createdAt));
  }

  async updateReferralStatus(referralId: string, status: string): Promise<Referral> {
    const [referral] = await db
      .update(referrals)
      .set({ status, updatedAt: new Date() })
      .where(eq(referrals.id, referralId))
      .returning();
    return referral;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getGroupMessages(groupId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.groupId, groupId))
      .orderBy(desc(messages.createdAt));
  }

  // Resume operations
  async createResume(resume: InsertResume): Promise<Resume> {
    const [newResume] = await db.insert(resumes).values(resume).returning();
    return newResume;
  }

  async getUserResume(userId: string): Promise<Resume | undefined> {
    const [resume] = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(desc(resumes.createdAt));
    return resume;
  }

  async updateResume(resumeId: string, updates: Partial<Resume>): Promise<Resume> {
    const [resume] = await db
      .update(resumes)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(resumes.id, resumeId))
      .returning();
    return resume;
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt));
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, notificationId));
  }

  // Pending invite operations
  async createPendingInvite(inviteData: InsertPendingInvite): Promise<PendingInvite> {
    const [invite] = await db.insert(pendingInvites).values(inviteData).returning();
    return invite;
  }

  async getPendingInvites(): Promise<PendingInvite[]> {
    return await db.select().from(pendingInvites).orderBy(desc(pendingInvites.createdAt));
  }

  async updateInviteStatus(inviteId: string, status: string): Promise<PendingInvite> {
    const [invite] = await db.update(pendingInvites)
      .set({ status })
      .where(eq(pendingInvites.id, inviteId))
      .returning();
    return invite;
  }
}

export const storage = new DatabaseStorage();
