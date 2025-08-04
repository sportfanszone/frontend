export const dynamic = "force-dynamic";

import HeroSection from "@/app/(root)/components/HeroSection";
import LeaguesSection from "@/app/(root)/components/LeaguesSection";
import TopConversationsSection from "@/app/(root)/components/TopConversationsSection";
import TrendingPostsSection from "@/app/(root)/components/TrendingPostsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LeaguesSection />
      <TopConversationsSection />
      <TrendingPostsSection />
    </main>
  );
}
