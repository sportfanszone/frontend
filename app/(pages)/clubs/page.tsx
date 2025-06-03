import ClubCard from "@/app/(pages)/components/ClubCard";
import Link from "next/link";

const club = [
  {
    id: 1,
    leagueName: "Manchester City",
    topics: 142,
    lastActivity: "Today, 09:14",
    description:
      "The most competitive football league in the world, featuring top English clubs.",
    logo: "/images/manchesterCityLogo.png",
    backgroundImage: "/images/manchesterCityBackgroundImage.png",
  },
  {
    id: 2,
    leagueName: "Arsenal",
    topics: 95,
    lastActivity: "Yesterday, 22:08",
    description:
      "Spain’s top-tier league, known for its flair, rivalries, and legendary players.",
    logo: "/images/arsenalLogo.png",
    backgroundImage: "/images/arsenalBackgroundImage.png",
  },
  {
    id: 3,
    leagueName: "Liverpool",
    topics: 110,
    lastActivity: "Today, 06:45",
    description:
      "Germany’s premier league, combining strong fan culture and attacking football.",
    logo: "/images/liverpool.png",
    backgroundImage: "/images/liverpoolBackgroundImage.png",
  },
  {
    id: 4,
    leagueName: "Chelsea",
    topics: 87,
    lastActivity: "2 days ago, 18:33",
    description:
      "Italy’s historic league, home to tactical brilliance and legendary defenders.",
    logo: "/images/chelsea.png",
    backgroundImage: "/images/chelseaBackgroundImage.png",
  },
  {
    id: 5,
    leagueName: "Manchester United",
    topics: 74,
    lastActivity: "Today, 11:01",
    description:
      "France’s top league, spotlighting young talents and dominant PSG performances.",
    logo: "/images/manchesterUnited.png",
    backgroundImage: "/images/manchesterUnitedBackgroundImage.png",
  },
  {
    id: 6,
    leagueName: "Tottenham Hotspur",
    topics: 63,
    lastActivity: "Yesterday, 20:17",
    description:
      "North America’s growing league, blending global stars and rising talents.",
    logo: "/images/tottenhamHotspur.png",
    backgroundImage: "/images/tottenhamHotspurBackgroundImage.png",
  },
];

export default function Clubs() {
  return (
    <main className="font-medium max-w-400 mx-auto">
      <section className=" max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Clubs
        </h2>

        <div className="flex justify-center items-center flex-wrap gap-8">
          {club.map((league, index) => (
            <Link href={`/topics/?club=${league.id}`} key={index}>
              <ClubCard
                clubName={league.leagueName}
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
    </main>
  );
}
