import LeagueCard from "./LeagueCard";

const leagues = [
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    logo: "/images/premierLeagueLogo.png",
  },
];

const LeaguesSection = () => {
  return (
    <section className="p-10 font-medium max-w-400 mx-auto @container">
      <h2 className="font-bold text-4xl text-center mb-10">Leagues</h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {leagues.map((league, index) => (
          <LeagueCard
            leagueName={league.leagueName}
            topics={league.topics}
            lastActivity={league.lastActivity}
            description={league.description}
            logo={league.logo}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default LeaguesSection;
