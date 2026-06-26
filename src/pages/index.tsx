import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Card, CardHeader, Button, StatusBadge, Badge } from "@/components";
import { BarChart3, Plus, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import type { Post, DashboardStats, ScheduleItem } from "@/types";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pendingApproval: 8,
    publishedThisWeek: 24,
    engagementRate: 3.2,
    leadCandidates: 12,
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "LinkedIn Post",
      content: "🚀 Excited to announce that our AI-powered platform is now live!...",
      platform: "linkedin",
      status: "review",
      tone: "professional",
      cta: "learn_more",
      createdAt: new Date(),
      updatedAt: new Date(),
      characterCount: 287,
      readabilityScore: "Excellent",
      seoScore: 8.5,
      aiGenerated: true,
    },
    {
      id: "2",
      title: "Instagram Carousel",
      content: "5-slide carousel showing behind-the-scenes content...",
      platform: "instagram",
      status: "review",
      tone: "conversational",
      cta: "share",
      createdAt: new Date(Date.now() - 5 * 60000),
      updatedAt: new Date(Date.now() - 5 * 60000),
      characterCount: 156,
      readabilityScore: "Good",
      seoScore: 7.0,
      aiGenerated: true,
    },
    {
      id: "3",
      title: "X Thread",
      content: "Thought leadership thread on AI trends...",
      platform: "x",
      status: "draft",
      tone: "professional",
      cta: "reply",
      createdAt: new Date(Date.now() - 45 * 60000),
      updatedAt: new Date(Date.now() - 45 * 60000),
      characterCount: 89,
      readabilityScore: "Excellent",
      seoScore: 8.0,
      aiGenerated: true,
    },
  ]);

  const [scheduleItems] = useState<ScheduleItem[]>([
    { time: "9:00 AM", platform: "linkedin", status: "published" },
    { time: "12:00 PM", platform: "instagram", status: "pending" },
    { time: "3:00 PM", platform: "x", status: "scheduled" },
    { time: "6:00 PM", platform: "linkedin", status: "scheduled" },
  ]);

  const getPlatformColor = (platform: string) => {
    const colors = {
      linkedin: "bg-blue-50 text-blue-900",
      instagram: "bg-pink-50 text-pink-900",
      x: "bg-gray-50 text-gray-900",
      facebook: "bg-blue-50 text-blue-900",
    };
    return colors[platform as keyof typeof colors] || colors.linkedin;
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      linkedin: "🔵",
      instagram: "📷",
      x: "𝕏",
      facebook: "f",
    };
    return icons[platform as keyof typeof icons] || "📱";
  };

  const handleApprove = (postId: string) => {
    setPosts(posts.map((p) => (p.id === postId ? { ...p, status: "approved" } : p)));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's your social media overview.</p>
              </div>
              <Link href="/editor">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingApproval}</p>
                  <p className="text-xs text-gray-500 mt-2">2 drafts, 6 ready to publish</p>
                </div>
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Published This Week</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.publishedThisWeek}</p>
                  <p className="text-xs text-gray-500 mt-2">LinkedIn 8, Instagram 12, X 4</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.engagementRate}%</p>
                  <p className="text-xs text-green-600 mt-2">↑ 0.4% from last week</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Lead Candidates</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.leadCandidates}</p>
                  <p className="text-xs text-gray-500 mt-2">From engagement analysis</p>
                </div>
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Approval Queue */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Approval Queue</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} variant="elevated">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${getPlatformColor(post.platform)}`}>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {post.status === "draft" ? "Draft" : "Ready to publish"} · {Math.round((Date.now() - post.createdAt.getTime()) / 60000)} min ago
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={post.status} />
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{post.content}</p>

                    <div className="flex gap-3">
                      {post.status === "review" && (
                        <>
                          <Button size="sm" onClick={() => handleApprove(post.id)}>
                            Approve
                          </Button>
                          <Button variant="secondary" size="sm">
                            View Draft
                          </Button>
                        </>
                      )}
                      {post.status === "draft" && (
                        <Link href="/editor">
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </Link>
                      )}
                      {post.status === "approved" && (
                        <Badge variant="success" size="sm">
                          Ready to publish
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Schedule */}
              <Card>
                <CardHeader title="Today's Schedule" />
                <div className="space-y-3">
                  {scheduleItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.time}</p>
                        <p className="text-xs text-gray-500">{item.platform.toUpperCase()}</p>
                      </div>
                      <span className="text-lg">
                        {item.status === "published" && "✓"}
                        {item.status === "pending" && "→"}
                        {item.status === "scheduled" && "⏱"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Agent Status */}
              <Card>
                <CardHeader title="Agent Status" />
                <div className="space-y-2">
                  {[
                    { name: "Content Brain", status: "active" },
                    { name: "Publishing Engine", status: "active" },
                    { name: "Engagement Monitor", status: "active" },
                    { name: "Analytics & Learning", status: "active" },
                  ].map((agent, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${agent.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                      <span className="text-sm text-gray-700">{agent.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
