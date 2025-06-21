import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { PageData } from "@/types";

export default cache(async function getTopicsData(): Promise<PageData> {
  return fetcher<PageData>(`${process.env.DOMAIN_URL}/api/root/topics`);
});
