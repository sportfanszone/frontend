import React, { Suspense } from "react";
import DashboardPageSkeleton from "@/app/(user)/components/dashboard/DashboardPageSkeleton";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<DashboardPageSkeleton />}>{children}</Suspense>
    </>
  );
}
