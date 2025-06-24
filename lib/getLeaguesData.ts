import { cache } from "react";
import fetcher from "@/lib/fetcher";
import { LeagueData } from "@/types";

export default cache(async function getLeaguesData(): Promise<LeagueData> {
  return await fetcher(`${process.env.DOMAIN_URL}/api/root/getLeagues`);
});
