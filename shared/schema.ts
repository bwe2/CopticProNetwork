import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User tier enum
export const userTierEnum = pgEnum("user_tier", ["free", "pro", "business"]);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  username: varchar("username").unique(),
  tier: userTierEnum("tier").default("free"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  church: varchar("church"),
  industry: varchar("industry"),
  profession: varchar("profession"),
  location: varchar("location"),
  bio: text("bio"),
  skills: text("skills").array(),
  achievements: text("achievements").array(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Groups table
export const groups = pgTable("groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  description: text("description"),
  type: varchar("type").notNull(), // "church" or "topic"
  church: varchar("church"),
  industry: varchar("industry"),
  isActive: boolean("is_active").default(true),
  memberCount: integer("member_count").default(0),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Group memberships
export const groupMemberships = pgTable("group_memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("group_id").references(() => groups.id),
  userId: varchar("user_id").references(() => users.id),
  role: varchar("role").default("member"), // "admin", "moderator", "member"
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  description: text("description"),
  company: varchar("company"),
  location: varchar("location"),
  industry: varchar("industry"),
  skillsRequired: text("skills_required").array(),
  salaryRange: varchar("salary_range"),
  type: varchar("type"), // "full-time", "part-time", "contract", "freelance"
  isActive: boolean("is_active").default(true),
  postedBy: varchar("posted_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Referrals table
export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id").references(() => jobs.id),
  requesterId: varchar("requester_id").references(() => users.id),
  referrerId: varchar("referrer_id").references(() => users.id),
  status: varchar("status").default("pending"), // "pending", "accepted", "declined", "completed"
  message: text("message"),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages table for chat
export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("group_id").references(() => groups.id),
  userId: varchar("user_id").references(() => users.id),
  content: text("content").notNull(),
  type: varchar("type").default("text"), // "text", "image", "file"
  createdAt: timestamp("created_at").defaultNow(),
});

// Resumes table
export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").references(() => users.id),
  originalContent: text("original_content"),
  optimizedContent: text("optimized_content"),
  aiAnalysis: jsonb("ai_analysis"),
  fileName: varchar("file_name"),
  fileUrl: varchar("file_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type"), // "referral", "job", "message", "system"
  title: varchar("title"),
  content: text("content"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Pending invites table for secure signup
export const pendingInvites = pgTable("pending_invites", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  church: varchar("church").notNull(),
  profession: varchar("profession").notNull(),
  referral: varchar("referral"),
  status: varchar("status").default("pending"), // "pending", "approved", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
});

// Type exports
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Group = typeof groups.$inferSelect;
export type InsertGroup = typeof groups.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type InsertResume = typeof resumes.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type PendingInvite = typeof pendingInvites.$inferSelect;
export type InsertPendingInvite = typeof pendingInvites.$inferInsert;

// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertGroupSchema = createInsertSchema(groups);
export const insertJobSchema = createInsertSchema(jobs);
export const insertReferralSchema = createInsertSchema(referrals);
export const insertMessageSchema = createInsertSchema(messages);
export const insertResumeSchema = createInsertSchema(resumes);
export const insertNotificationSchema = createInsertSchema(notifications);
export const insertPendingInviteSchema = createInsertSchema(pendingInvites);
