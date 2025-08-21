export const dynamic = "force-dynamic";
import LeagueCard from "@/app/(root)/components/LeagueCard";
import Link from "next/link";
import getLeaguesData from "@/lib/getLeaguesData";
import { League } from "@/types";
import { FiChevronRight } from "react-icons/fi";

const LeaguesSection = async () => {
  try {
    const leagues: League[] = (await getLeaguesData(true))?.leagues;

    if (!leagues || leagues.length === 0) {
      return (
        <section className="p-10 font-medium max-w-300 mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
            No Leagues Available
          </h2>
          <p className="text-center">Please check back later.</p>
        </section>
      );
    }

    return (
      <section className="p-10 font-medium max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Leagues
        </h2>

        <div className="flex justify-center items-center flex-wrap gap-8 mb-4">
          {leagues.map((league, index) => (
            <Link href={`/clubs?league=${league.id}`} key={index}>
              <LeagueCard
                leagueName={league.name}
                clubCount={league.clubCount}
                lastActivity={league.lastAccess}
                description={league.description}
                logo={league.logo}
                backgroundImage={league.backgroundImage}
              />
            </Link>
          ))}
        </div>
        <Link
          href="/leagues"
          className="flex items-center text-center justify-center hover:text-blue-700 hover:underline transition-all w-fit mx-auto"
        >
          <span>See more</span> <FiChevronRight />
        </Link>
      </section>
    );
  } catch (error) {
    console.error("Error fetching leagues:", error);
    return (
      <section className="p-10 font-medium max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Error Fetching Leagues
        </h2>
        <p className="text-center">Please try again later.</p>
      </section>
    );
  }
};

export default LeaguesSection;
