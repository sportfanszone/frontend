import React, { Suspense } from "react";
import ClubsSidebar from "@/app/(pages)/components/clubs/ClubsSidebar";
import ClubSidebarSkeleton from "@/app/(pages)/components/clubs/ClubSidebarSkeleton";
import ClubsPageSkeleton from "../components/clubs/ClubsPageSkeleton";

export default function ClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main */}
      <div className="min-h-screen w-[100%] px-4 py-10">
        <Suspense fallback={<ClubsPageSkeleton />}>{children}</Suspense>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
        <Suspense fallback={<ClubSidebarSkeleton />}>
          <ClubsSidebar />
        </Suspense>
      </div>
    </>
  );
}
