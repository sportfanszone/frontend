import LeagueCard from "@/app/(root)/components/LeagueCard";
import Link from "next/link";

const leagues = [
  {
    id: 1,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    id: 2,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    id: 3,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    id: 4,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    id: 5,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    id: 6,
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
];

const LeaguesSection = () => {
  return (
    <section className="p-10 font-medium max-w-400 mx-auto">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
        Leagues
      </h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {leagues.map((league, index) => (
          <Link href={`/leagues/${league.id}`} key={index}>
            <LeagueCard
              leagueName={league.leagueName}
              topics={league.topics}
              lastActivity={league.lastActivity}
              description={league.description}
              logo={league.logo}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeaguesSection;
