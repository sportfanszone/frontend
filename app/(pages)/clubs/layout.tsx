import React, { Suspense } from "react";
import ClubsPageSkeleton from "@/app/(pages)/components/clubs/ClubsPageSkeleton";

export default function ClubsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main */}

      <Suspense fallback={<ClubsPageSkeleton />}>{children}</Suspense>
    </>
  );
}
