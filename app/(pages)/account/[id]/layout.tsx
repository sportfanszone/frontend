import React, { Suspense } from "react";
import DashboardSidebar from "@/app/(pages)/components/account/AccountSidebar";
import DashboardPageSkeleton from "@/app/(pages)/components/account/AccountPageSkeleton";
import DashboardSidebarSkeleton from "@/app/(pages)/components/account/AccountSidebarSkeleton";

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
      <div className="hidden min-[908px]:flex min-h-screen w-120 mr-4 mt-4">
        <Suspense fallback={<DashboardSidebarSkeleton />}>
          <DashboardSidebar />
        </Suspense>
      </div>
    </>
  );
}
