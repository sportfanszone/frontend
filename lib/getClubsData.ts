import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { ClubPageData } from "@/types";

export default cache(async (league: string): Promise<ClubPageData> => {
  return fetcher<ClubPageData>(
    `${process.env.DOMAIN_URL}/api/pages/clubs?league=${league}`
  );
});
