import PostCard from "./PostCard";

const leagues = [
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
  {
    leagueName: "Premier League",
    topics: 120,
    lastActivity: "Today, 01:20",
    username: "@username",
    logo: "/images/premierLeagueLogo.png",
    createdAt: "2 hours ago",
  },
];

const LatestPosts = () => {
  return (
    <section className="p-10 font-medium max-w-400 mx-auto @container">
      <h2 className="font-bold text-4xl text-center mb-10">Posts</h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {leagues.map((league, index) => (
          <PostCard
            leagueName={league.leagueName}
            topics={league.topics}
            lastActivity={league.lastActivity}
            username={league.username}
            logo={league.logo}
            createdAt={league.createdAt}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
