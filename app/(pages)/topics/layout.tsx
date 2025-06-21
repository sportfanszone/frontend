import React, { ReactElement, Suspense, use } from "react";
import TopicsSidebar from "@/app/(pages)/components/TopicsSidebar";
import TopicsPageSkeleton from "../components/TopicsPageSkeleton";
import TopicsSidebarSkeleton from "@/app/(pages)/components/TopicsSidebarSkeleton";

export default async function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
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
          <TopicsSidebar />
        </Suspense>
      </div>
    </>
  );
}
