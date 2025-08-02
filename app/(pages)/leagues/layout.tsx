import React, { Suspense } from "react";
import LeaguesPageSkeleton from "@/app/(pages)/components/leagues/LeaguesPageSkeleton";

export default function ClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main */}
      <Suspense fallback={<LeaguesPageSkeleton />}>{children}</Suspense>
    </>
  );
}
