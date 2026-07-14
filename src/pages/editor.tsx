import React, { useState } from "react";
import Link from "next/link";
import { Layout, Card, CardHeader, Button, TextArea, ImageUpload } from "@/components";
import { ArrowLeft } from "lucide-react";
import type { Platform } from "@/types";

const platforms: Array<{ value: Platform; label: string; icon: string }> = [
  { value: "linkedin", label: "LinkedIn", icon: "🔵" },
];


export default function Editor() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("linkedin");
const [topic, setTopic] = useState("");
const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ file: File; preview: string } | null>(null);

const handleImageSelect = (file: File, preview: string) => {
  setUploadedImage({ file, preview });
};

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: topic, platform: selectedPlatform }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGeneratedContent(data.enhanced_content ?? data);
    } catch (error) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const characterCount = generatedContent.length;
  const maxCharacters = selectedPlatform === "x" ? 280 : 3000;

  return (
    <Layout>
      <div className="min-height-screen bg-gray-50">
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
    <Button variant="secondary">Save Draft</Button>
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
                    <label className="block text-sm font-medium text-gray-900 mb-3">Select Platform</label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.value}
                          onClick={() => setSelectedPlatform(platform.value)}
                          className={`p-3 rounded-lg border-2 transition-colors text-center ${
                            selectedPlatform === platform.value
                              ? "border-primary bg-blue-50"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <span className="text-2xl mb-2 block">{platform.icon}</span>
                          <p className="text-sm font-medium text-gray-900">{platform.label}</p>
                        </button>
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

                 
		  {/* Image Upload */}
<ImageUpload onImageSelect={handleImageSelect} />
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
                {selectedPlatform === "linkedin" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Your Company</p>
                        <p className="text-xs text-gray-500">just now</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{generatedContent}</p>
                    <div className="flex gap-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <button className="hover:text-primary">👍 Like</button>
                      <button className="hover:text-primary">💬 Comment</button>
                      <button className="hover:text-primary">↗️ Share</button>
                    </div>
                  </div>
                )}

                {selectedPlatform === "instagram" && (
                  <div className="space-y-4">
                    <div className="bg-gray-200 w-full aspect-square rounded-lg flex items-center justify-center text-gray-500">
                      Photo/Carousel
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-3">{generatedContent}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <button className="hover:text-red-500">❤️</button>
                      <button className="hover:text-primary">💬</button>
                      <button className="hover:text-primary">📤</button>
                      <button className="hover:text-primary">📌</button>
                    </div>
                  </div>
                )}

                {selectedPlatform === "x" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Your Company</p>
                        <p className="text-xs text-gray-500">@yourcompany • now</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{generatedContent}</p>
                    <div className="flex justify-between text-xs text-gray-500 pt-2 max-w-xs">
                      <button className="hover:text-blue-400">💬 12</button>
                      <button className="hover:text-blue-400">🔄 34</button>
                      <button className="hover:text-red-400">❤️ 56</button>
                      <button className="hover:text-blue-400">📤</button>
                    </div>
                  </div>
                )}

                {selectedPlatform === "facebook" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Your Company</p>
                        <p className="text-xs text-gray-500">just now</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{generatedContent}</p>
                    <div className="flex gap-4 pt-2 border-t border-gray-200 text-xs font-medium text-gray-600">
                      <button className="flex-1 py-2 hover:bg-gray-100 rounded">👍 Like</button>
                      <button className="flex-1 py-2 hover:bg-gray-100 rounded">💬 Comment</button>
                      <button className="flex-1 py-2 hover:bg-gray-100 rounded">↗️ Share</button>
                    </div>
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
		{/* Post Button */}
<Button 
  className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
  onClick={() => alert("Post API call here")}
>
  Post
 </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
