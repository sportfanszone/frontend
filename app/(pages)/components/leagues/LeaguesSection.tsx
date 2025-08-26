export const dynamic = "force-dynamic";
import LeagueCard from "@/app/(root)/components/LeagueCard";
import Link from "next/link";
import { League } from "@/types";
import BackButton from "@/app/components/ui/BackButton";

const LeaguesSection = ({ leagues }: { leagues: League[] }) => {
  return (
    <section className="max-w-300 mx-auto">
      <div className="flex gap-3">
        <BackButton />
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
          Fanszone
        </h2>
      </div>

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
    </section>
  );
};

export default LeaguesSection;
