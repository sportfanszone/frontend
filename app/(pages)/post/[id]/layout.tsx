import React, { ReactElement } from "react";
import PostSidebar from "@/app/(pages)/components/post/PostSidebar";

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

export default async function TopicsLayout({
  children,
}: {
  children: ReactElement<{ data: PageData }>;
}) {
  try {
    const data = await getData();
    const childrenWithProps = React.cloneElement(children, { data });

    return (
      <>
        <div className="min-h-screen w-full px-4 py-10">
          {childrenWithProps}
        </div>
        {/* Sidebar */}
        <div className="hidden md:flex min-h-screen w-120 mr-4 mt-4">
          <PostSidebar />
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to load topic layout data:", error);
    return (
      <div className="min-h-screen w-full px-4 py-10 text-center text-red-600">
        An error occurred while loading this page.
      </div>
    );
  }
}
