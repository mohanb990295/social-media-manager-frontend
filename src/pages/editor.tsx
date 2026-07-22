import React, { useState } from "react";
import Link from "next/link";
import { Layout, Card, CardHeader, Button, TextArea, ImageUpload } from "@/components";
import { ArrowLeft, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import type { Platform } from "@/types";

interface PlatformOption {
  value: Platform;
  label: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

export default function Editor() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("linkedin");
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ file: File; preview: string } | null>(null);
  const [error, setError] = useState("");

  const platforms: PlatformOption[] = [
    {
      value: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="w-8 h-8 text-blue-600" />,
    },
    {
      value: "instagram",
      label: "Instagram",
      icon: <Instagram className="w-8 h-8 text-pink-600" />,
      comingSoon: true,
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <Facebook className="w-8 h-8 text-blue-600" />,
      comingSoon: true,
    },
    {
      value: "x",
      label: "X",
      icon: <Twitter className="w-8 h-8 text-black" />,
      comingSoon: true,
    },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const response = await fetch(
        "https://ai-content-enhancer-git-main-apex-tricon.vercel.app/enhance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context: topic,
            platform: selectedPlatform,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.enhanced_content ?? data);
    } catch (error) {
      setError("Failed to generate content. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setUploadedImage({ file, preview });
  };

  const characterCount = generatedContent.length;
  const maxCharacters = selectedPlatform === "x" ? 280 : 3000;

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
                <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
                <p className="text-gray-600 mt-1">AI-assisted content creation</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => alert("Post API call here")}>Post</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div>
              <Card>
                <CardHeader title="Content Brief" subtitle="Define what your post should be about" />

                <div className="space-y-6">
                  {/* Platform Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Select Platform
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((platform) => (
                        <div key={platform.value}>
                          {platform.comingSoon ? (
                            // Disabled platform card
                            <button
                              disabled
                              className="w-full p-4 rounded-lg border-2 border-gray-200 bg-gray-50 text-center opacity-60 cursor-not-allowed transition-colors"
                            >
                              <div className="flex justify-center mb-2">{platform.icon}</div>
                              <p className="text-sm font-medium text-gray-900">{platform.label}</p>
                              <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
                            </button>
                          ) : (
                            // Clickable LinkedIn platform card
                            <button
                              onClick={() => setSelectedPlatform(platform.value)}
                              className={`w-full p-4 rounded-lg border-2 transition-colors text-center ${
                                selectedPlatform === platform.value
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              <div className="flex justify-center mb-2">{platform.icon}</div>
                              <p className="text-sm font-medium text-gray-900">{platform.label}</p>
                              <p className="text-xs text-green-600 mt-1">Active</p>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Topic Input */}
                  <TextArea
                    label="What should this post be about?"
                    placeholder="E.g., Launch of new AI feature, Company milestone, Industry insight..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    characterLimit={500}
                  />

                  {/* Error Message */}
                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  {/* Image Upload 
                  <ImageUpload onImageSelect={handleImageSelect} />*/}

                  {/* Generate Button */}
                  <Button
                    variant="gradient"
                    className="w-full text-lg font-bold"
                    onClick={handleGenerate}
                    isLoading={isGenerating}
                  >
                    ✨ Generate with AI
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right: Preview */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Preview</h2>

              {/* Image Preview */}
              {uploadedImage && (
                <Card className="mb-6">
                  <img
                    src={uploadedImage.preview}
                    alt="Uploaded"
                    className="w-full rounded-lg max-h-64 object-cover"
                  />
                </Card>
              )}

              {/* Platform Preview */}
              <Card variant="elevated" className="mb-6">
                {/* LinkedIn Preview */}
                {selectedPlatform === "linkedin" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        T
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tricon Infotech</p>
                        <p className="text-xs text-gray-500">just now</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {generatedContent || "Generated content will appear here..."}
                    </p>
                    <div className="flex gap-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <button className="hover:text-blue-600">👍 Like</button>
                      <button className="hover:text-blue-600">💬 Comment</button>
                      <button className="hover:text-blue-600">↗️ Share</button>
                    </div>
                  </div>
                )}

                {/* Instagram Preview */}
                {selectedPlatform === "instagram" && (
                  <div className="space-y-4 text-center text-gray-500 py-8">
                    <p>Instagram preview coming soon</p>
                  </div>
                )}

                {/* Facebook Preview */}
                {selectedPlatform === "facebook" && (
                  <div className="space-y-4 text-center text-gray-500 py-8">
                    <p>Facebook preview coming soon</p>
                  </div>
                )}

                {/* X/Twitter Preview */}
                {selectedPlatform === "x" && (
                  <div className="space-y-4 text-center text-gray-500 py-8">
                    <p>X preview coming soon</p>
                  </div>
                )}
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <p className="text-xs text-gray-600 font-medium">Character Count</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    {characterCount} / {maxCharacters}
                  </p>
                </Card>
                <Card>
                  <p className="text-xs text-gray-600 font-medium">Readability Score</p>
                  <p className="text-lg font-bold text-green-600 mt-2">Excellent ✓</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}