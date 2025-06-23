export const dynamic = "force-dynamic";
import LeagueCard from "@/app/(root)/components/LeagueCard";
import Link from "next/link";

type leagueType = {
  id: number;
  leagueName: string;
  topics: number;
  lastActivity: string;
  description: string;
  logo: string;
  backgroundImage: string;
};

const LeaguesSection = async () => {
  try {
    const getLeagues = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/root/getLeagues`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        return data?.leagues;
      }

      throw new Error("Failed to fetch leagues");
    };

    const leagues = (await getLeagues()) as leagueType[];
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

        <div className="flex justify-center items-center flex-wrap gap-8">
          {leagues.map((league, index) => (
            <Link href={`/clubs?league=${league.id}`} key={index}>
              <LeagueCard
                leagueName={league.leagueName}
                topics={league.topics}
                lastActivity={league.lastActivity}
                description={league.description}
                logo={league.logo}
                backgroundImage={league.backgroundImage}
              />
            </Link>
          ))}
        </div>
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
