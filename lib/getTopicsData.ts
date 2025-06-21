import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { TopicPageData } from "@/types";

export default cache(async function getTopicsData(): Promise<TopicPageData> {
  return fetcher<TopicPageData>(`${process.env.DOMAIN_URL}/api/pages/topics`);
});
