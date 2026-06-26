import React, { useState } from "react";
import { Layout, Card, CardHeader, Badge, StatusBadge, Button } from "@/components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Platform } from "@/types";

interface ScheduledPost {
  id: string;
  date: Date;
  time: string;
  platform: Platform;
  title: string;
  status: "scheduled" | "published" | "failed";
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [posts] = useState<ScheduledPost[]>([
    {
      id: "1",
      date: new Date(2024, 0, 15),
      time: "9:00 AM",
      platform: "linkedin",
      title: "Product Launch Announcement",
      status: "scheduled",
    },
    {
      id: "2",
      date: new Date(2024, 0, 15),
      time: "12:00 PM",
      platform: "instagram",
      title: "Behind the Scenes",
      status: "scheduled",
    },
    {
      id: "3",
      date: new Date(2024, 0, 18),
      time: "3:00 PM",
      platform: "x",
      title: "Industry Insights",
      status: "scheduled",
    },
    {
      id: "4",
      date: new Date(2024, 0, 10),
      time: "10:00 AM",
      platform: "linkedin",
      title: "Success Story",
      status: "published",
    },
  ]);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getPlatformColor = (platform: Platform) => {
    const colors = {
      linkedin: "bg-blue-100 text-blue-900",
      instagram: "bg-pink-100 text-pink-900",
      x: "bg-gray-100 text-gray-900",
      facebook: "bg-blue-100 text-blue-900",
    };
    return colors[platform];
  };

  const getPlatformIcon = (platform: Platform) => {
    const icons = {
      linkedin: "🔵",
      instagram: "📷",
      x: "𝕏",
      facebook: "📘",
    };
    return icons[platform];
  };

  const getPostsForDate = (day: number) => {
    return posts.filter((post) => post.date.getDate() === day && post.date.getMonth() === currentDate.getMonth());
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth(currentDate); i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth(currentDate); i++) {
    calendarDays.push(i);
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
            <p className="text-gray-600 mt-2">Schedule and manage your posts across all platforms</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <Card>
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">{monthName}</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
                      }
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-900 text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-4">
                  {calendarDays.map((day, idx) => {
                    const dayPosts = day ? getPostsForDate(day) : [];
                    return (
                      <div
                        key={idx}
                        className={`min-h-32 p-2 rounded-lg border-2 ${
                          day
                            ? "border-gray-200 bg-white hover:border-primary hover:bg-blue-50 cursor-pointer transition-colors"
                            : "border-gray-100 bg-gray-50"
                        }`}
                      >
                        {day && (
                          <>
                            <div className="font-semibold text-gray-900 mb-2">{day}</div>
                            <div className="space-y-1">
                              {dayPosts.map((post) => (
                                <div
                                  key={post.id}
                                  className={`text-xs p-1.5 rounded ${getPlatformColor(post.platform)}`}
                                >
                                  <div className="font-medium truncate">{getPlatformIcon(post.platform)}</div>
                                  <div className="text-xs truncate">{post.time}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar: Today's Posts */}
            <div className="space-y-6">
              <Card>
                <CardHeader title="Today's Scheduled Posts" subtitle="January 15, 2024" />
                <div className="space-y-3">
                  {[
                    {
                      time: "9:00 AM",
                      platform: "linkedin" as Platform,
                      title: "Product Launch",
                      status: "scheduled" as const,
                    },
                    {
                      time: "12:00 PM",
                      platform: "instagram" as Platform,
                      title: "Behind the Scenes",
                      status: "scheduled" as const,
                    },
                    {
                      time: "3:00 PM",
                      platform: "x" as Platform,
                      title: "Quick Tip",
                      status: "scheduled" as const,
                    },
                  ].map((post, idx) => (
                    <div key={idx} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium text-gray-900">{post.time}</p>
                        <Badge variant="info" size="sm">
                          {post.platform}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{post.title}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader title="This Month" subtitle="January 2024" />
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">LinkedIn</p>
                    <p className="text-lg font-semibold text-blue-600">8</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Instagram</p>
                    <p className="text-lg font-semibold text-pink-600">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">X (Twitter)</p>
                    <p className="text-lg font-semibold text-gray-600">4</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
