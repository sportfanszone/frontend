import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { LeagueData } from "@/types";

export default cache(async (pinned: boolean): Promise<LeagueData> => {
  return fetcher<LeagueData>(
    `${process.env.DOMAIN_URL}/api/root/get_leagues?pinned=${
      pinned ? "true" : "false"
    }`
  );
});
