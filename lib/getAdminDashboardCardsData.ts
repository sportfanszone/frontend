import { cache } from "react";
import fetcher from "@/lib/fetcher";

type GetAdminDashboardCardsData = {
  totalUsers: number;
  totalPosts: number;
  totalLeagues: number;
  totalClubs: number;
};
export default cache(
  async function getTrendingPostsData(): Promise<GetAdminDashboardCardsData> {
    return fetcher<GetAdminDashboardCardsData>(
      `${process.env.DOMAIN_URL}/api/admin/get_dashboard_cards_data`
    );
  }
);
