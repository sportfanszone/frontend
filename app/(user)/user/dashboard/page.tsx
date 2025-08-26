export const dynamic = "force-dynamic";

import { getUserFromCookie } from "@/lib/auth";
import { User, Post } from "@/types";
import getUserPostsData from "@/lib/getUserPostsData";
import ProfileHeader from "@/app/(user)/components/dashboard/ProfileHeader";
import PostsSection from "@/app/(user)/components/dashboard/PostsSection";

export default async function UserDashboard() {
  const user = await getUserFromCookie();
  let initialPosts: Post[] = [];

  try {
    const data = await getUserPostsData(user?.id as string, 0, 10);
    initialPosts = data?.posts || [];
  } catch (error) {
    console.error("Failed to fetch initial user posts:", error);
  }

  return (
    <>
      <ProfileHeader user={user as User} />
      <PostsSection userId={user?.id as string} initialPosts={initialPosts} />
    </>
  );
}
