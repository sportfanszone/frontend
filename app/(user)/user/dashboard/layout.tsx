import React, { Suspense } from "react";
import DashboardSidebar from "@/app/(user)/components/dashboard/DashboardSidebar";
import DashboardPageSkeleton from "@/app/(user)/components/dashboard/DashboardPageSkeleton";
import DashboardSidebarSkeleton from "@/app/(user)/components/dashboard/DashboardSidebarSkeleton";

export default async function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main */}
      <div className="min-h-screen w-[100%] px-4 py-10">
        <Suspense fallback={<DashboardPageSkeleton />}>{children}</Suspense>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
        <Suspense fallback={<DashboardSidebarSkeleton />}>
          <DashboardSidebar />
        </Suspense>
      </div>
    </>
  );
}
