export const dynamic = "force-dynamic";

import { Suspense } from "react";
import TopicCard from "@/app/(pages)/components/topics/TopicCard";
import getTopicsData from "@/lib/getTopicsData";
import BackButton from "@/app/components/ui/BackButton";
import TopicsSidebar from "@/app/(pages)/components/topics/TopicsSidebar";
import TopicsSidebarSkeleton from "@/app/(pages)/components/topics/TopicsSidebarSkeleton";
import { TopicPageData } from "@/types";

export default async function TopicsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    const params = await searchParams;
    const clubId = params?.club as string;
    const query = params?.q as string;

    const { topics }: TopicPageData = await getTopicsData(clubId, query);

    if (!topics || topics.length === 0) {
      return (
        <div className="min-h-screen w-[100%] px-4 py-10">
          <div className="flex items-center gap-2">
            <BackButton />
            <p className="text-center">No topics available</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="min-h-screen w-[100%] px-4 py-10">
          <main className="font-medium max-w-400 mx-auto px-4">
            <section className="w-full max-w-300 mx-auto">
              <div className="flex gap-3">
                <BackButton />
                <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
                  Topics
                </h2>
              </div>

              <div className="flex flex-col gap-6 max-w-250 mx-auto w-full">
                {topics.map((topic, index) => (
                  <TopicCard key={index} topic={topic} />
                ))}
              </div>
            </section>
          </main>
        </div>
        {/* Sidebar */}
        <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
          <Suspense fallback={<TopicsSidebarSkeleton />}>
            <TopicsSidebar />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen w-[100%] px-4 py-10">
        <p>An error occured while loading topics</p>
      </div>
    );
  }
}
