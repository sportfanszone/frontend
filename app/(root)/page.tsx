import HeroSection from "./components/HeroSection";
import LeaguesSection from "./components/LeaguesSection";
import LatestPostsSection from "./components/LatestPostsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LeaguesSection />
      <LatestPostsSection />
    </main>
  );
}
