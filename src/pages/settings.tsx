import React, { useState } from "react";
import { Layout, Card, CardHeader, Button, Input, Select } from "@/components";
import { Badge } from "@/components";
import type { Platform } from "@/types";

const platforms: Array<{ value: Platform; label: string; icon: string }> = [
  { value: "linkedin", label: "LinkedIn", icon: "🔵" },
  { value: "instagram", label: "Instagram", icon: "📷" },
  { value: "x", label: "X (Twitter)", icon: "𝕏" },
  { value: "facebook", label: "Facebook", icon: "📘" },
];

export default function Settings() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>(["linkedin", "instagram"]);
  const [email, setEmail] = useState("john.doe@company.com");
  const [teamName, setTeamName] = useState("Marketing Team");
  const [timezone, setTimezone] = useState("America/New_York");

  const handleConnectPlatform = (platform: Platform) => {
    if (connectedPlatforms.includes(platform)) {
      setConnectedPlatforms(connectedPlatforms.filter((p) => p !== platform));
    } else {
      setConnectedPlatforms([...connectedPlatforms, platform]);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account and platform integrations</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Account Settings */}
          <Card className="mb-8">
            <CardHeader title="Account Settings" subtitle="Manage your profile" />
            <div className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />

              <Select
                label="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                options={[
                  { value: "America/New_York", label: "Eastern Time (ET)" },
                  { value: "America/Chicago", label: "Central Time (CT)" },
                  { value: "America/Denver", label: "Mountain Time (MT)" },
                  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                  { value: "Europe/London", label: "GMT" },
                  { value: "Europe/Paris", label: "Central European Time (CET)" },
                  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
                  { value: "Asia/Singapore", label: "Singapore Standard Time (SGT)" },
                ]}
              />

              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          {/* Platform Integration */}
          <Card className="mb-8">
            <CardHeader
              title="Connected Platforms"
              subtitle="Connect your social media accounts for publishing and analytics"
            />
            <div className="space-y-4">
              {platforms.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.value);
                return (
                  <div
                    key={platform.value}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{platform.label}</p>
                        {isConnected && (
                          <p className="text-xs text-gray-500 mt-1">
                            Connected as @{platform.value}_handle
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isConnected && <Badge variant="success" size="sm">Connected</Badge>}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleConnectPlatform(platform.value)}
                      >
                        {isConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Approval Settings */}
          <Card className="mb-8">
            <CardHeader title="Approval Workflow" subtitle="Configure content approval process" />
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Require approval before publishing
                </label>
                <div className="flex gap-2">
                  <Button>On</Button>
                  <Button variant="secondary">Off</Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Approvers
                </label>
                <div className="space-y-2">
                  {["john.doe@company.com", "jane.smith@company.com"].map((approver) => (
                    <div key={approver} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{approver}</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="mt-3">
                  + Add Approver
                </Button>
              </div>
            </div>
          </Card>

          {/* Content Guidelines */}
          <Card className="mb-8">
            <CardHeader title="Content Guidelines" subtitle="Set brand voice and content standards" />
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Brand Voice Description
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  defaultValue="Professional, authoritative, and educational. We aim to position our company as a thought leader in the industry."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Banned Topics / Keywords
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter topics or keywords separated by commas..."
                />
              </div>
            </div>
          </Card>

          {/* Security & Privacy */}
          <Card className="mb-8">
            <CardHeader title="Security & Privacy" />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                </div>
                <Button variant="secondary" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Session Timeout</p>
                  <p className="text-sm text-gray-600 mt-1">Auto-logout after 1 hour of inactivity</p>
                </div>
                <Badge variant="default" size="sm">
                  1 hour
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Data Retention</p>
                  <p className="text-sm text-gray-600 mt-1">Automatically delete old analytics data</p>
                </div>
                <Badge variant="default" size="sm">
                  90 days
                </Badge>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card>
            <CardHeader title="Danger Zone" subtitle="Irreversible actions" />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Delete Account</p>
                  <p className="text-sm text-gray-600 mt-1">Permanently delete your account and all data</p>
                </div>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
