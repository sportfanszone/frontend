import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { Post } from "@/types";

export default cache(async function getLeaguesData(): Promise<{
  posts: { posts: Post[] };
}> {
  return await fetcher(`${process.env.DOMAIN_URL}/api/user/get_posts`);
});
