import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Layout, Card, Button } from "@/components";
import { ArrowLeft, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface PlatformMetrics {
  name: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  onClick?: () => void;
}

// Raw shape returned by GET /post-analytics
interface RawPostAnalytics {
  postId: string;
  analytics: {
    impressions: number;
    members_reached: number;
    profile_viewers: number;
    followers_gained: number;
    reactions: number;
    comments: number;
    reposts: number;
  };
}

// Flattened shape used by the table
interface PostRow {
  postId: string;
  likes: number;
  comments: number;
  reach: number;
}

interface AnalyticsSummary {
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalReach: number;
  totalFollowersGained: number;
  totalLeads: number;
}

export default function Analytics() {
  const [showLeadsModal, setShowLeadsModal] = useState(false);

  const [posts, setPosts] = useState<PostRow[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary>({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
    totalReach: 0,
    totalFollowersGained: 0,
    totalLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<RawPostAnalytics[]>(`${API_URL}/post-analytics`);
      const raw = res.data;

      // Flatten analytics.* into top-level fields for the table
      const rows: PostRow[] = raw.map((p) => ({
        postId: p.postId,
        likes: p.analytics.reactions,       // "Likes" column mapped from reactions
        comments: p.analytics.comments,
        reach: p.analytics.impressions,     // "Total Reach" mapped from impressions
      }));

      setPosts(rows);

      // Compute summary totals on the frontend since /post-analytics
      // returns per-post data, not a pre-aggregated summary
      const totals = raw.reduce(
        (acc, p) => {
          acc.totalComments += p.analytics.comments;
          acc.totalLikes += p.analytics.reactions;
          acc.totalReach += p.analytics.impressions;
          acc.totalFollowersGained += p.analytics.followers_gained;
          return acc;
        },
        { totalComments: 0, totalLikes: 0, totalReach: 0, totalFollowersGained: 0 }
      );

      setSummary({
        totalPosts: raw.length,
        totalComments: totals.totalComments,
        totalLikes: totals.totalLikes,
        totalReach: totals.totalReach,
        totalFollowersGained: totals.totalFollowersGained,
        totalLeads: 0,
      });
    } catch (err) {
      console.error("Failed to fetch post analytics:", err);
      setError("Couldn't load analytics data. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLeads = async () => {
    setShowLeadsModal(true);
    setLeadsLoading(true);
    setLeadsError(null);
    try {
      const res = await axios.get(`${API_URL}/get-leads`);
      const data = res.data;
      const leadsArray = Array.isArray(data) ? data : data.leads ?? data.data ?? [];

      setLeads(leadsArray);
      setSummary((prev) => ({ ...prev, totalLeads: leadsArray.length }));
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      setLeadsError("Couldn't fetch leads. Check that the backend is running.");
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLinkedInClick = () => {
    fetchAnalytics();
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

          {/* Section 3: Key Metrics (now live) */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalPosts}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalComments}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalLikes}</p>
              </Card>

              <Card>
                <p className="text-xs text-gray-600 font-medium">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{summary.totalLeads}</p>
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

              {loading ? (
                <p className="text-gray-500 text-center py-8">Loading post analytics...</p>
              ) : error ? (
                <p className="text-red-600 text-center py-8">{error}</p>
              ) : posts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No posts found yet.</p>
              ) : (
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
                      {posts.map((post) => (
                        <tr key={post.postId} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900 font-medium">{post.postId}</td>
                          <td className="py-3 px-4 text-center text-gray-700">{post.likes}</td>
                          <td className="py-3 px-4 text-center text-gray-700">{post.comments}</td>
                          <td className="py-3 px-4 text-gray-700">
                            {post.reach.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Generate Leads Modal */}
      {showLeadsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLeadsModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto p-8">
            <button
              onClick={() => setShowLeadsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Leads</h2>
            <p className="text-gray-600 mb-6">Analyze post comments to identify potential leads</p>

            <div className="space-y-4">
              {leadsLoading ? (
                <p className="text-gray-500 text-center py-6">Scoring leads...</p>
              ) : leadsError ? (
                <p className="text-red-600 text-center py-6">{leadsError}</p>
              ) : leads.length === 0 ? (
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-500">No leads found yet.</p>
                </div>
              ) : (
                leads.map((lead, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Commented on: {lead.postText}
                        </p>
                        <p className="text-sm text-gray-700 mt-2 italic">"{lead.message}"</p>
                        <p className="text-xs text-gray-600 mt-2">{lead.reasoning}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium whitespace-nowrap">
                          {lead.total_score}/100
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium whitespace-nowrap">
                          {lead.intent}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

 