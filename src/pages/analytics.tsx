import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Layout, Card, Button } from "@/components";
import { ArrowLeft, Linkedin, Instagram, Facebook, Twitter, Sparkles, RefreshCw, Mail, MessageSquare, Copy, Check, Send } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-content-enhancer.vercel.app";

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

const getScoreBadgeClass = (score: number) => {
  if (score >= 60) {
    return "bg-green-100 text-green-700 border border-green-200";
  } else if (score >= 40) {
    return "bg-orange-100 text-orange-700 border border-orange-200";
  } else {
    return "bg-red-100 text-red-700 border border-red-200";
  }
};

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

  // Outreach Draft State
  const [selectedLeadForDraft, setSelectedLeadForDraft] = useState<any | null>(null);
  const [draftChannel, setDraftChannel] = useState<"email" | "message">("email");
  const [draftSubject, setDraftSubject] = useState<string>("");
  const [draftBody, setDraftBody] = useState<string>("");
  const [draftLoading, setDraftLoading] = useState<boolean>(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [draftVariation, setDraftVariation] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleDraftMessage = async (
    lead: any,
    channel: "email" | "message" = "email",
    nextVariation: number = 1
  ) => {
    setSelectedLeadForDraft(lead);
    setDraftChannel(channel);
    setDraftVariation(nextVariation);
    setDraftLoading(true);
    setDraftError(null);
    setCopied(false);

    try {
      const res = await axios.post(`${API_URL}/draft-message`, {
        lead_name: lead.name,
        lead_message: lead.message,
        post_text: lead.postText,
        intent: lead.intent,
        reasoning: lead.reasoning,
        channel: channel,
        variation: nextVariation,
      });

      setDraftSubject(res.data.subject || "");
      setDraftBody(res.data.body || "");
    } catch (err) {
      console.error("Failed to draft message:", err);
      setDraftError("Failed to draft outreach message. Please verify backend service.");
    } finally {
      setDraftLoading(false);
    }
  };

  const handleRegenerateDraft = () => {
    if (selectedLeadForDraft) {
      const nextVar = draftVariation + 1;
      handleDraftMessage(selectedLeadForDraft, draftChannel, nextVar);
    }
  };

  const handleCopyDraft = () => {
    const textToCopy =
      draftChannel === "email" && draftSubject
        ? `Subject: ${draftSubject}\n\n${draftBody}`
        : draftBody;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      const sortedLeads = [...leadsArray].sort(
        (a, b) => (b.total_score ?? 0) - (a.total_score ?? 0)
      );

      setLeads(sortedLeads);
      setSummary((prev) => ({ ...prev, totalLeads: sortedLeads.length }));
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
                  <Button onClick={handleGenerateLeads}>Generated Leads</Button>
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

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Generated Leads</h2>
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
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
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
                        <span className={`text-xs px-2 py-1 rounded font-medium whitespace-nowrap ${getScoreBadgeClass(lead.total_score || 0)}`}>
                          {lead.total_score}/100
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium whitespace-nowrap">
                          {lead.intent}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500 font-medium">
                        Confidence: <span className="capitalize text-gray-700 font-semibold">{lead.confidence || "Medium"}</span>
                      </span>
                      <button
                        onClick={() => handleDraftMessage(lead, "email", 1)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Draft Email / Message
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Draft Outreach Modal with Regenerate Button */}
      {selectedLeadForDraft && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLeadForDraft(null)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-[90vw] max-w-2xl overflow-hidden p-6">
            <button
              onClick={() => setSelectedLeadForDraft(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Draft Outreach to {selectedLeadForDraft.name}
              </h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              AI-assisted personalized response (Option #{draftVariation})
            </p>

            {/* Channel Switcher */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleDraftMessage(selectedLeadForDraft, "email", 1)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all ${
                  draftChannel === "email"
                    ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Mail className="w-4 h-4" /> Email Draft
              </button>
              <button
                onClick={() => handleDraftMessage(selectedLeadForDraft, "message", 1)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all ${
                  draftChannel === "message"
                    ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> LinkedIn DM
              </button>
            </div>

            {draftLoading ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                <p className="text-sm text-gray-600 font-medium">Generating draft option #{draftVariation}...</p>
              </div>
            ) : draftError ? (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                {draftError}
              </div>
            ) : (
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {draftChannel === "email" && draftSubject && (
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Subject Line</label>
                    <input
                      type="text"
                      value={draftSubject}
                      onChange={(e) => setDraftSubject(e.target.value)}
                      className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Message Body</label>
                  <textarea
                    rows={6}
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    className="w-full text-sm text-gray-900 bg-white border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRegenerateDraft}
                  disabled={draftLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${draftLoading ? "animate-spin" : ""}`} />
                  🔄 Regenerate Response
                </button>

                {draftChannel === "email" ? (
                  <button
                    onClick={() => alert("Send Email integration is coming soon!")}
                    disabled={draftLoading}
                    title="Send Email directly (Coming Soon)"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-blue-600" />
                    Send Email (Coming Soon)
                  </button>
                ) : (
                  <button
                    onClick={() => alert("Send LinkedIn DM integration is coming soon!")}
                    disabled={draftLoading}
                    title="Send LinkedIn DM directly (Coming Soon)"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 disabled:opacity-50 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-indigo-600" />
                    Send DM (Coming Soon)
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyDraft}
                  disabled={draftLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Draft"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
