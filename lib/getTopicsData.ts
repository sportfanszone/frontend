import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { TopicPageData } from "@/types";

export default cache(
  async (club: string, query: string): Promise<TopicPageData> => {
    return fetcher<TopicPageData>(
      `${process.env.DOMAIN_URL}/api/pages/topics?club=${club || ""}&q=${
        query || ""
      }`
    );
  }
);
