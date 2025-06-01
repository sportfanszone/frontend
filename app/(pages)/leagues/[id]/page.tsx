import LeagueCard from "@/app/(root)/components/LeagueCard";
import Link from "next/link";

const leagues = [
  {
    id: 1,
    leagueName: "Premier League",
    topics: 142,
    lastActivity: "Today, 09:14",
    description:
      "The most competitive football league in the world, featuring top English clubs.",
    logo: "/images/premierLeagueLogo.png",
    backgroundImage: "/images/premierLeagueBackground.png",
  },
  {
    id: 2,
    leagueName: "La Liga",
    topics: 95,
    lastActivity: "Yesterday, 22:08",
    description:
      "Spain’s top-tier league, known for its flair, rivalries, and legendary players.",
    logo: "/images/laLigaLogo.png",
    backgroundImage: "/images/laLigaBackgroundImage.png",
  },
  {
    id: 3,
    leagueName: "Bundesliga",
    topics: 110,
    lastActivity: "Today, 06:45",
    description:
      "Germany’s premier league, combining strong fan culture and attacking football.",
    logo: "/images/bundesligaLogo.png",
    backgroundImage: "/images/bundesligaBackgroundImage.png",
  },
  {
    id: 4,
    leagueName: "Serie A",
    topics: 87,
    lastActivity: "2 days ago, 18:33",
    description:
      "Italy’s historic league, home to tactical brilliance and legendary defenders.",
    logo: "/images/serieALogo.png",
    backgroundImage: "/images/serieABackgroundImage.png",
  },
  {
    id: 5,
    leagueName: "Ligue 1",
    topics: 74,
    lastActivity: "Today, 11:01",
    description:
      "France’s top league, spotlighting young talents and dominant PSG performances.",
    logo: "/images/ligue1Logo.png",
    backgroundImage: "/images/ligue1BackgroundImage.png",
  },
  {
    id: 6,
    leagueName: "Major League Soccer",
    topics: 63,
    lastActivity: "Yesterday, 20:17",
    description:
      "North America’s growing league, blending global stars and rising talents.",
    logo: "/images/mlsLogo.png",
    backgroundImage: "/images/majorLeagueSoccerBackgroundImage.png",
  },
];

export default function LeagueSection() {
  return (
    <main className="p-10 font-medium max-w-400 mx-auto pt-35">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
        Clubs
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
              backgroundImage={league.backgroundImage}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
