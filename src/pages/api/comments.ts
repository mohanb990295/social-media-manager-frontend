import type { NextApiRequest, NextApiResponse } from "next";

interface CommentItem {
  id: number;
  postId: string;
  body: string;
  user: {
    username: string;
    fullName?: string;
  };
}

interface CommentsResponse {
  postId: string;
  total: number;
  comments: CommentItem[];
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
    // Dummy endpoint call to simulate upstream comments service.
    const response = await fetch(`https://dummyjson.com/comments/post/${encodeURIComponent(postId)}`);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Dummy comments endpoint failed with status ${response.status}` });
    }

    const data = (await response.json()) as {
      total?: number;
      comments?: Array<{ id: number; body: string; user?: { username?: string; fullName?: string } }>;
    };

    const comments: CommentItem[] = (data.comments ?? []).map((comment) => ({
      id: comment.id,
      postId,
      body: comment.body,
      user: {
        username: comment.user?.username ?? "unknown",
        fullName: comment.user?.fullName,
      },
    }));

    const responseBody: CommentsResponse = {
      postId,
      total: data.total ?? comments.length,
      comments,
      source: "dummyjson",
    };

    return res.status(200).json(responseBody);
  } catch {
    return res.status(500).json({ error: "Failed to reach dummy comments endpoint" });
  }
}