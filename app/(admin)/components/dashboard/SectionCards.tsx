import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import getAdminDashboardCardsData from "@/lib/getAdminDashboardCardsData";

export async function SectionCards() {
  try {
    const { totalUsers, totalPosts, totalLeagues, totalClubs } =
      await getAdminDashboardCardsData();

    const hasNoData =
      !totalUsers && !totalPosts && !totalLeagues && !totalClubs;

    if (hasNoData) {
      return (
        <section className="p-10 font-medium max-w-300 mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
            No Data Available
          </h2>
          <p className="text-center">Please check back later.</p>
        </section>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs">
        {totalUsers > 0 && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalUsers.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +8.6%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                User base grew this month <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Active users surged over the last 30 days
              </div>
            </CardFooter>
          </Card>
        )}

        {totalPosts > 0 && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Posts</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalPosts.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -5.4%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Signups slowed down <IconTrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Fewer users joined this week compared to last
              </div>
            </CardFooter>
          </Card>
        )}

        {totalLeagues > 0 && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Leagues</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalLeagues.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +3.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Expansion to new regions <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                4 new leagues added in the last quarter
              </div>
            </CardFooter>
          </Card>
        )}

        {totalClubs > 0 && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Clubs</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalClubs.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +2.1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Consistent growth <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Club registration remains steady across regions
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.error("❌ Failed to load dashboard cards:", error);
    return (
      <div className="px-4 py-8 text-center text-destructive">
        <p>An error occurred while loading dashboard data.</p>
      </div>
    );
  }
}
