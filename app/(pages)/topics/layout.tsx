import React, { Suspense } from "react";
import TopicsSidebar from "@/app/(pages)/components/topics/TopicsSidebar";
import TopicsPageSkeleton from "@/app/(pages)/components/topics/TopicsPageSkeleton";
import TopicsSidebarSkeleton from "@/app/(pages)/components/topics/TopicsSidebarSkeleton";

export default function TopicsLayout({
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
