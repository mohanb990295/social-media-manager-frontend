import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Card, CardHeader } from "@/components";
import { ArrowLeft, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
 
type TimePeriod = "week" | "month" | "quarter";
 
interface PlatformMetrics {
  name: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  onClick?: () => void;
}
 
interface PostData {
  id: string;
  title: string;
  engagement: number;
  leads: number;
}
 
interface AnalyticsData {
  reach: number;
  engagement: number;
  engagementRate: number;
  followers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalLeads: number;
}
 
export default function Analytics() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("quarter");
  const [posts] = useState<PostData[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    reach: 102500,
    engagement: 8400,
    engagementRate: 8.1,
    followers: 5500,
    totalPosts: 144,
    totalComments: 2940,
    totalLikes: 15300,
    totalLeads: 336,
  });
  const [loading, setLoading] = useState(false);
 
  // Fetch analytics from API
  useEffect(() => {
    fetchAnalytics();
  }, [timePeriod]);
 
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/analytics?period=${timePeriod}`);
      // const data = await response.json();
      // setAnalyticsData(data);
 
      // Mock data for now - will be replaced with real API data
      const mockMetrics = {
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
 
      setAnalyticsData(mockMetrics[timePeriod]);
 
      // TODO: Fetch posts from Unipile API
      // const postsResponse = await fetch(`/api/posts?period=${timePeriod}`);
      // const postsData = await postsResponse.json();
      // setPosts(postsData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleLinkedInClick = () => {
    // TODO: This will handle LinkedIn-specific actions
    // Could be: redirect to LinkedIn management page, show LinkedIn details, etc.
    alert("LinkedIn Analytics - Coming soon with Unipile integration!");
  };
 
  // Platform data with actual icons
  const platforms: PlatformMetrics[] = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-8 h-8 text-blue-600" />,
      onClick: handleLinkedInClick,
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-8 h-8 text-pink-600" />,
      comingSoon: true,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-8 h-8 text-blue-600" />,
      comingSoon: true,
    },
    {
      name: "X",
      icon: <Twitter className="w-8 h-8 text-black" />,
      comingSoon: true,
    },
  ];
 
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
                <div key={platform.name}>
                  {platform.comingSoon ? (
                    // Disabled card for Coming Soon platforms
                    <Card className="opacity-60 cursor-not-allowed">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">{platform.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{platform.name}</p>
                            <p className="text-xs text-gray-500">Coming Soon</p>
                          </div>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          Soon
                        </span>
                      </div>
                    </Card>
                  ) : (
                    // Clickable card for LinkedIn
                    <Card
                      className="cursor-pointer hover:shadow-md hover:border-primary transition-all"
                      onClick={platform.onClick}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">{platform.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{platform.name}</p>
                            <p className="text-xs text-gray-500">Active</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Active
                        </span>
                      </div>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
 
          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading analytics data...</p>
            </div>
          )}
 
        {/* Section 2: Key Metrics *
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Reach</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {(analyticsData.reach / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 mt-2">↑ 12% vs last period</p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Engagement</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {(analyticsData.engagement / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-green-600 mt-2">↑ 8% vs last period</p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Avg. Engagement Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.engagementRate}%
                </p>
                <p className="text-xs text-red-600 mt-2">↓ 2% vs last period</p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Follower Growth</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">+{analyticsData.followers}</p>
                <p className="text-xs text-green-600 mt-2">↑ 25% vs last period</p>
              </Card>
            </div>
          </div>/}
 
          {/* Section 3: Additional Metrics */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.totalPosts}</p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.totalComments}
                </p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.totalLikes}</p>
              </Card>
 
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.totalLeads}</p>
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
                  💡 <strong>API Ready:</strong> This component is ready to connect to Unipile API.
                  Replace mock data with real API calls in <code>fetchAnalytics()</code> function.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}