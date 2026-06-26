// Types for social media posts and content
export type Platform = "linkedin" | "instagram" | "x" | "facebook";

export type PostStatus = "draft" | "review" | "approved" | "published" | "rejected";

export type ContentTone = "professional" | "conversational" | "educational" | "inspirational";

export type CTA = "learn_more" | "sign_up" | "reply" | "share" | "none";

export type EngagementType = "like" | "comment" | "share" | "retweet" | "save";

export type SentimentScore = "positive" | "neutral" | "negative";

export interface Post {
  id: string;
  title: string;
  content: string;
  platform: Platform;
  status: PostStatus;
  tone: ContentTone;
  cta: CTA;
  createdAt: Date;
  updatedAt: Date;
  scheduledFor?: Date;
  publishedAt?: Date;
  characterCount: number;
  readabilityScore: string;
  seoScore: number;
  aiGenerated: boolean;
}

export interface Engagement {
  id: string;
  postId: string;
  type: EngagementType;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  content: string;
  sentiment?: SentimentScore;
  isLeadOpportunity: boolean;
  createdAt: Date;
}

export interface Analytics {
  postId: string;
  impressions: number;
  clicks: number;
  engagementRate: number;
  shares: number;
  comments: number;
  likes: number;
  saves?: number;
  followers?: number;
  reportedAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  status: "active" | "idle" | "processing";
  lastUpdated: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "contributor";
  avatar?: string;
  connectedPlatforms: Platform[];
}

export interface ApprovalQueue {
  id: string;
  postId: string;
  submittedBy: string;
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  status: PostStatus;
  notes?: string;
}

export interface ContentBrief {
  topic: string;
  tone: ContentTone;
  platform: Platform;
  cta: CTA;
  targetAudience?: string;
  keywords?: string[];
}

export interface PlatformConfig {
  platform: Platform;
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  accountName?: string;
  accountId?: string;
}

export interface DashboardStats {
  pendingApproval: number;
  publishedThisWeek: number;
  engagementRate: number;
  leadCandidates: number;
}

export interface ScheduleItem {
  time: string;
  platform: Platform;
  status: "scheduled" | "published" | "pending";
}
