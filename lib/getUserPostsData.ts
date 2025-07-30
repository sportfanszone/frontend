import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types";

export default cache(
  async (
    userId: string
  ): Promise<{
    posts: { posts: Post[] };
  }> => {
    return fetcher<{
      posts: { posts: Post[] };
    }>(`${process.env.DOMAIN_URL}/api/user/get_user_posts/${userId}`);
  }
);
