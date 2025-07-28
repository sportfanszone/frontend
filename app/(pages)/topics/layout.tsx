import React, { Suspense } from "react";
import TopicsPageSkeleton from "@/app/(pages)/components/topics/TopicsPageSkeleton";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main */}

      <Suspense fallback={<TopicsPageSkeleton />}>{children}</Suspense>
    </>
  );
}
