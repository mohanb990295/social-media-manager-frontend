import React, { useState } from "react";
import Link from "next/link";
import { Layout, Card, CardHeader } from "@/components";
import { ArrowLeft } from "lucide-react";

type TimePeriod = "week" | "month" | "quarter";

interface PlatformMetrics {
  name: string;
  icon: string;
  comingSoon?: boolean;
}

interface PostData {
  id: string;
  title: string;
  engagement: number;
  leads: number;
}

export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("week");
  const [posts] = useState<PostData[]>([]);

  // Platform data
  const platforms: PlatformMetrics[] = [
    { name: "LinkedIn", icon: "🔵" },
    { name: "Instagram", icon: "📷" },
    { name: "Facebook", icon: "📘", comingSoon: true },
    { name: "X", icon: "𝕏", comingSoon: true },
  ];

  // Get metrics based on time period
  const getMetrics = () => {
    const metricsData = {
      week: {
        reach: 8500,
        engagement: 650,
        engagementRate: 7.6,
        followers: 450,
        totalPosts: 12,
        totalComments: 245,
        totalLikes: 1250,
        totalLeads: 28,
      },
      month: {
        reach: 34200,
        engagement: 2800,
        engagementRate: 8.2,
        followers: 1850,
        totalPosts: 48,
        totalComments: 980,
        totalLikes: 5100,
        totalLeads: 112,
      },
      quarter: {
        reach: 102500,
        engagement: 8400,
        engagementRate: 8.1,
        followers: 5500,
        totalPosts: 144,
        totalComments: 2940,
        totalLikes: 15300,
        totalLeads: 336,
      },
    };

    return metricsData[timePeriod];
  };

  const metrics = getMetrics();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <button className="flex items-center gap-2 text-primary mb-4 hover:opacity-80">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </Link>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-1">Track performance across all platforms</p>
              </div>

              {/* Time Period Selector */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setTimePeriod("week")}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    timePeriod === "week"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimePeriod("month")}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    timePeriod === "month"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimePeriod("quarter")}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    timePeriod === "quarter"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Quarter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Section 1: Platform Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <Card key={platform.name}>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{platform.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      {platform.comingSoon && (
                        <p className="text-xs text-gray-500">Coming Soon</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 2: Key Metrics */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Reach</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {(metrics.reach / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 mt-2">↑ 12% vs last period</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Engagement</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {(metrics.engagement / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 mt-2">↑ 8% vs last period</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Avg. Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.engagementRate}%</p>
                <p className="text-xs text-red-600 mt-2">↓ 2% vs last period</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Follower Growth</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">+{metrics.followers}</p>
                <p className="text-xs text-green-600 mt-2">↑ 25% vs last period</p>
              </Card>
            </div>
          </div>

          {/* Section 3: Additional Metrics */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalPosts}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalComments}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalLikes}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalLeads}</p>
              </Card>
            </div>
          </div>

          {/* Section 4: Posts Table */}
          <div>
            <Card>
              <CardHeader
                title="Posts Analytics"
                subtitle="Performance metrics for each post"
              />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Post ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Leads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-gray-500">
                          No posts data yet. Posts will appear here once connected to Unipile API.
                        </td>
                      </tr>
                    ) : (
                      posts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{post.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{post.title}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{post.engagement}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{post.leads}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>Note:</strong> This table will be populated with real data once you
                  connect to Unipile API. Currently showing placeholder structure.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}