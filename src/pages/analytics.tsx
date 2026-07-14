import React, { useState } from "react";
import { Layout, Card, CardHeader, Badge, Button } from "@/components";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { Platform } from "@/types";

const performanceData = [
  { platform: "LinkedIn", impressions: 12500, clicks: 450, engagement: 3.6, followers: 2450 },
  { platform: "Instagram", impressions: 18200, clicks: 920, engagement: 5.1, followers: 3200 },
  { platform: "X", impressions: 8500, clicks: 340, engagement: 4.0, followers: 1850 },
  { platform: "Facebook", impressions: 6200, clicks: 180, engagement: 2.9, followers: 1200 },
];

const weeklyData = [
  { day: "Mon", engagement: 120, reach: 2400, followers: 240 },
  { day: "Tue", engagement: 132, reach: 2210, followers: 221 },
  { day: "Wed", engagement: 101, reach: 2290, followers: 229 },
  { day: "Thu", engagement: 198, reach: 2000, followers: 200 },
  { day: "Fri", engagement: 78, reach: 2181, followers: 218 },
  { day: "Sat", engagement: 39, reach: 2500, followers: 250 },
  { day: "Sun", engagement: 52, reach: 2100, followers: 210 },
];

const contentPerformance = [
  { name: "LinkedIn", value: 35, color: "#1e40af" },
  { name: "Instagram", value: 45, color: "#ec4899" },
  { name: "X", value: 15, color: "#1f2937" },
  { name: "Facebook", value: 5, color: "#3b82f6" },
];

const topPosts = [
  { id: 1, platform: "instagram" as Platform, title: "Product Launch Carousel", engagement: 2150, sentiment: "positive" },
  { id: 2, platform: "linkedin" as Platform, title: "Thought Leadership Article", engagement: 1840, sentiment: "positive" },
  { id: 3, platform: "x" as Platform, title: "Industry Insights Thread", engagement: 945, sentiment: "positive" },
  { id: 4, platform: "facebook" as Platform, title: "Community Update", engagement: 650, sentiment: "neutral" },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-2">Track performance across all platforms</p>
              </div>
              <div className="flex gap-2">
                {["week", "month", "quarter"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">45.2K</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 12% vs last week
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">2.8K</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 8% vs last week
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Avg. Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">4.2%</p>
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> 2% vs last week
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Follower Growth</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">1.2K</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 23% vs last week
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Engagement */}
            <Card>
              <CardHeader title="Weekly Engagement Trend" subtitle="Last 7 days" />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#1e40af" strokeWidth={2} />
                  <Line type="monotone" dataKey="reach" stroke="#06b6d4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Platform Distribution */}
            <Card>
              <CardHeader title="Content Distribution" subtitle="By platform" />
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contentPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {contentPerformance.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <Badge variant="default" size="sm">
                      {item.value}%
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Platform Performance Table */}
          <Card className="mb-8">
            <CardHeader title="Platform Performance" subtitle="Detailed metrics" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Platform</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Impressions</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Clicks</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Engagement Rate</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Followers</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((row) => (
                    <tr key={row.platform} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{row.platform}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{row.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{row.clicks}</td>
                      <td className="py-3 px-4 text-right text-gray-700">{row.engagement}%</td>
                      <td className="py-3 px-4 text-right text-gray-700">+{row.followers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Top Performing Posts */}
          <Card>
            <CardHeader title="Top Performing Posts" subtitle="This week" />
            <div className="space-y-3">
              {topPosts.map((post) => (
                <div key={post.id} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{post.platform.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{post.engagement}</p>
                    <Badge variant={post.sentiment === "positive" ? "success" : "default"} size="sm">
                      {post.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
