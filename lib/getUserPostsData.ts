import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types";

export default cache(
  async (
    userId: string,
    offset: number = 0,
    limit: number = 12
  ): Promise<{ posts: Post[] }> => {
    return fetcher<{ posts: Post[] }>(
      `${process.env.DOMAIN_URL}/api/user/get_user_posts/${userId}?offset=${offset}&limit=${limit}`
    );
  }
);
