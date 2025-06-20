import TopicsSidebar from "@/app/(pages)/components/TopicsSidebar";
import React, { ReactElement } from "react";

export type PageData = {
  posts: number;
  followers: number;
  topContributors: {
    id: number;
    name: string;
    profileImage: string;
  }[];
};

async function getData(): Promise<PageData> {
  return {
    posts: 10,
    followers: 200,
    topContributors: [
      {
        id: 1,
        name: "John",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 2,
        name: "Jane",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 3,
        name: "Alice",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 4,
        name: "Bob",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 5,
        name: "Charlie",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 6,
        name: "Dave",
        profileImage: "/images/blankProfile.png",
      },
    ],
  };
}

export default async function TopicsLayout({
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
        <TopicsSidebar data={data} />
      </div>
    </>
  );
}
