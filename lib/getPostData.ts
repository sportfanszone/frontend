import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types";

export default cache(async (post: string): Promise<{ post: Post }> => {
  return fetcher<{ post: Post }>(
    `${process.env.DOMAIN_URL}/api/user/get_post/${post}`
  );
});
