export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ClubCard from "@/app/(pages)/components/clubs/ClubCard";
import getClubsData from "@/lib/getClubsData";
import { ClubPageData } from "@/types";
import ClubsSidebar from "@/app/(pages)/components/clubs/ClubsSidebar";
import ClubSidebarSkeleton from "@/app/(pages)/components/clubs/ClubSidebarSkeleton";
import BackButton from "@/app/components/ui/BackButton";

export default async function Clubs({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    const params = await searchParams;
    const leagueId = params?.league as string;

    const { clubs }: ClubPageData = await getClubsData(leagueId);

    if (!clubs || clubs.length === 0) {
      return (
        <div className="min-h-screen w-[100%] px-4 py-10">
          <p className="text-center mt-10">No clubs available</p>
        </div>
      );
    }

    return (
      <>
        <div className="min-h-screen w-[100%] px-4 py-10">
          <main className="font-medium max-w-400 mx-auto">
            <section className="max-w-300 mx-auto">
              <div className="flex gap-3">
                <BackButton />
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
                  Choose Category
                </h2>
              </div>

              <div className="flex justify-center items-center flex-wrap gap-8">
                {clubs.map((club, index) => (
                  <ClubCard key={index} club={club} />
                ))}
              </div>
            </section>
          </main>
        </div>
        {/* Sidebar */}
        <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
          <Suspense fallback={<ClubSidebarSkeleton />}>
            <ClubsSidebar leagueId={leagueId} />
          </Suspense>
        </div>
      </>
    );
  } catch {
    return <p>An error occured while loading clubs</p>;
  }
}
