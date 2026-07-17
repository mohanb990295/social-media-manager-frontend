import type { NextApiRequest, NextApiResponse } from "next";

interface EngagementResponse {
  postId: string;
  views: number;
  likes: number;
  shares: number;
  saves: number;
  engagementRate: number;
  source: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const postId = req.query.postId;

  if (!postId || Array.isArray(postId) || !postId.trim()) {
    return res.status(400).json({ error: "postId is required" });
  }

  try {
    // Dummy endpoint call to simulate upstream engagement service.
    const response = await fetch(`https://dummyjson.com/posts/${encodeURIComponent(postId)}`);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Dummy engagement endpoint failed with status ${response.status}` });
    }

    const dummyPost = (await response.json()) as {
      reactions?: { likes?: number; dislikes?: number };
      views?: number;
      userId?: number;
    };

    const likes = dummyPost.reactions?.likes ?? 0;
    const views = dummyPost.views ?? 0;
    const shares = Math.floor(likes * 0.14);
    const saves = Math.floor(likes * 0.09);
    const engagementTotal = likes + shares + saves;
    const engagementRate = views > 0 ? Number(((engagementTotal / views) * 100).toFixed(2)) : 0;

    const data: EngagementResponse = {
      postId,
      views,
      likes,
      shares,
      saves,
      engagementRate,
      source: "dummyjson",
    };

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Failed to reach dummy engagement endpoint" });
  }
}