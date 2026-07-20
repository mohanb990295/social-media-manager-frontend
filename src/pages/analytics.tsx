import React, { useState } from "react";
import Link from "next/link";
import { Layout, Card, Button } from "@/components";
import { ArrowLeft, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

interface PlatformMetrics {
  name: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  onClick?: () => void;
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
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [analyticsData] = useState<AnalyticsData>({
    reach: 102500,
    engagement: 8400,
    engagementRate: 8.1,
    followers: 5500,
    totalPosts: 144,
    totalComments: 2940,
    totalLikes: 15300,
    totalLeads: 336,
  });

  const handleLinkedInClick = () => {
    alert("LinkedIn Analytics - Coming soon with Unipile integration!");
  };

  const handleGenerateLeads = () => {
    setShowLeadsModal(true);
  };

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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track performance across all platforms</p>
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

          {/* Section 2: Key Metrics */}
          {/* <div className="mb-8">
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
          </div> */}

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

          {/* Section 4: Posts Analytics Tables */}
          <div>
            <Card>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Posts Analytics</h3>
                    <p className="text-sm text-gray-600">Performance metrics for each post</p>
                  </div>
                  <Button onClick={handleGenerateLeads}>Generate Leads</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Post ID</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Likes</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Comments</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Total Reach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "POST-001", likes: 245, comments: 38, reach: "12.4K" },
                      { id: "POST-002", likes: 189, comments: 27, reach: "9.8K" },
                      { id: "POST-003", likes: 312, comments: 54, reach: "18.2K" },
                      { id: "POST-004", likes: 156, comments: 19, reach: "7.6K" },
                      { id: "POST-005", likes: 421, comments: 63, reach: "22.1K" },
                      { id: "POST-006", likes: 98, comments: 12, reach: "5.3K" },
                      { id: "POST-007", likes: 276, comments: 41, reach: "14.7K" },
                      { id: "POST-008", likes: 134, comments: 22, reach: "6.9K" },
                    ].map((post) => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-medium">{post.id}</td>
                        <td className="py-3 px-4 text-center text-gray-700">{post.likes}</td>
                        <td className="py-3 px-4 text-center text-gray-700">{post.comments}</td>
                        <td className="py-3 px-4 text-gray-700">{post.reach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  💡 <strong>API Ready:</strong> This component is ready to connect to Unipile API.
                  Replace mock data with real API calls when backend is ready.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Generate Leads Modal */}
      {showLeadsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLeadsModal(false)}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto p-8">
            {/* Close button */}
            <button
              onClick={() => setShowLeadsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Leads</h2>
            <p className="text-gray-600 mb-6">Analyze post comments to identify potential leads</p>

            {/* Modal content placeholder */}
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500">Lead generation content goes here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}