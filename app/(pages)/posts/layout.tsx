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

export default async function PagesLayout({
  children,
}: {
  children: ReactElement<{ data: PageData }>;
}) {
  const data = await getData();

  const childrenWithProps = React.cloneElement(children, { data });

  return <>{childrenWithProps}</>;
}
