import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { LeagueData, League, Club } from "@/types";

interface GetLeaguesData {
  leagues: League[];
  clubs: Club[];
}

export default cache(async (pinned: boolean): Promise<GetLeaguesData> => {
  return fetcher<GetLeaguesData>(
    `${process.env.DOMAIN_URL}/api/root/get_leagues?pinned=${
      pinned ? "true" : "false"
    }`
  );
});
