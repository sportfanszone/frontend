import React, { ReactElement, Suspense, use } from "react";
import TopicsSidebar from "@/app/(pages)/components/TopicsSidebar";
import TopicsPageSkeleton from "../components/TopicsPageSkeleton";
import TopicsSidebarSkeleton from "@/app/(pages)/components/TopicsSidebarSkeleton";
import getTopicsData from "@/lib/getTopicsData";
import { TopicPageData } from "@/types";

function Sidebar() {
  const data = use(getTopicsData());
  return <TopicsSidebar data={data} />;
}

export default async function TopicsLayout({
  children,
}: {
  children: ReactElement<{ data: TopicPageData }>;
}) {
  return (
    <>
      {/* Main */}
      <div className="min-h-screen w-[100%] px-4 py-10">
        <Suspense fallback={<TopicsPageSkeleton />}>{children}</Suspense>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
        <Suspense fallback={<TopicsSidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </div>
    </>
  );
}
