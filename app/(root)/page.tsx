export const dynamic = "force-dynamic";

import HeroSection from "@/app/(root)/components/HeroSection";
import LeaguesSection from "@/app/(root)/components/LeaguesSection";
import TopConversationsSection from "@/app/(root)/components/TopConversationsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LeaguesSection />
      <TopConversationsSection />
    </main>
  );
}
