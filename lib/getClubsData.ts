import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { ClubPageData } from "@/types";

export default cache(async function getClubsData(): Promise<ClubPageData> {
  return fetcher<ClubPageData>(`${process.env.DOMAIN_URL}/api/pages/clubs`);
});
