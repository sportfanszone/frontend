import HeroSection from "./components/HeroSection";
import LeaguesSection from "./components/LeaguesSection";
import LatestPostsSection from "./components/LatestPostsSection";
import TrendingPostsSection from "./components/TrendingPostsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LeaguesSection />
      <LatestPostsSection />
      <TrendingPostsSection />
    </main>
  );
}
