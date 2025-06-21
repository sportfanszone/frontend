import TopicsSidebar from "@/app/(pages)/components/TopicsSidebar";
import React, { ReactElement } from "react";
import fetcher from "@/lib/fetcher";

export type PageData = {
  posts: number;
  followers: number;
  topContributors: {
    id: number;
    name: string;
    profileImage: string;
  }[];
};

export default async function TopicsLayout({
  children,
}: {
  children: ReactElement<{ data: PageData }>;
}) {
  let data: PageData | null = null;

  try {
    data = await fetcher<PageData>(`${process.env.DOMAIN_URL}/api/root/topics`);
  } catch (error) {
    console.error("Error fetching topics data:", error);
    // Handle the error appropriately, e.g., show an error message or fallback UI
    return (
      <div className="min-h-screen w-[100%] px-4 py-10">
        <p className="text-red-500">Failed to load topics data.</p>
      </div>
    );
  }

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
