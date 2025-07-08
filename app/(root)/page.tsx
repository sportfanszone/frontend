import HeroSection from "@/app/(root)/components/HeroSection";
import LeaguesSection from "@/app/(root)/components/LeaguesSection";
import LatestPostsSection from "@/app/(root)/components/LatestPostsSection";
import TrendingPostsSection from "@/app/(root)/components/TrendingPostsSection";

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
