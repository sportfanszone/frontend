export const dynamic = "force-dynamic";
import fetcher from "@/lib/fetcher";
import { DashboardPageData } from "@/types";

export default function getDashboardData(): Promise<DashboardPageData> {
  return fetcher(`${process.env.DOMAIN_URL}/api/user/dashboard`);
}
