import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { Comment } from "@/types";

export default cache(async (post: string): Promise<{ comments: Comment[] }> => {
  return fetcher<{ comments: Comment[] }>(
    `${process.env.DOMAIN_URL}/api/user/get_comment/${post}`
  );
});
