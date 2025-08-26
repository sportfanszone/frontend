export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LeaguesSection from "@/app/(pages)/components/leagues/LeaguesSection";
import LeaguesSidebar from "@/app/(pages)/components/leagues/LeaguesSidebar";
import LeaguesSidebarSkeleton from "@/app/(pages)/components/leagues/LeaguesSidebarSkeleton";

import getLeaguesData from "@/lib/getLeaguesData";

export default async function LeaguesPage() {
  try {
    const { leagues, clubs } = await getLeaguesData(true);

    if (!leagues || leagues.length === 0) {
      return (
        <section className="p-10 font-medium max-w-300 mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
            Fanszone
          </h2>
          <p className="text-center">Please check back later.</p>
        </section>
      );
    }

    return (
      <>
        {/* Main */}
        <div className="min-h-screen w-[100%] px-4 py-10">
          <main className="font-medium max-w-400 mx-auto">
            <LeaguesSection leagues={leagues} />
          </main>
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
          <Suspense fallback={<LeaguesSidebarSkeleton />}>
            <LeaguesSidebar clubs={clubs} />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    return <p>An error occured while loading clubs</p>;
  }
}
