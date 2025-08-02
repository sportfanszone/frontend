import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { TopConversationsData } from "@/types";

export default cache(
  async function getTopConversationsDAta(): Promise<TopConversationsData> {
    return fetcher<TopConversationsData>(
      `${process.env.DOMAIN_URL}/api/root/get_top_conversations`
    );
  }
);
