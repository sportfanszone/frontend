import ClubsSidebar from "@/app/(pages)/components/ClubsSidebar";
import React, { ReactElement } from "react";

type PageData = {
  posts: number;
  followers: number;
};

async function getData(): Promise<PageData> {
  return {
    posts: 10,
    followers: 200,
  };
}

export default async function ClubsLayout({
  children,
}: {
  children: ReactElement<{ data: PageData }>;
}) {
  const data = await getData();
  const childrenWithProps = React.cloneElement(children, { data });

  return (
    <>
      <div className="min-h-screen w-[100%] px-4 py-10">
        {childrenWithProps}
      </div>
      {/* Sidebar */}
      <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
        <ClubsSidebar />
      </div>
    </>
  );
}
