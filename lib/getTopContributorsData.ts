import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { User } from "@/types";

export default cache(async function getTrendingPostsData(): Promise<{
  contributors: User[];
}> {
  return fetcher<{
    contributors: User[];
  }>(`${process.env.DOMAIN_URL}/api/root/get_top_contributors`);
});
