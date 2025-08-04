export const dynamic = "force-dynamic";

import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

import ProfileHeader from "@/app/(user)/components/dashboard/ProfileHeader";
import PostsSection from "@/app/(user)/components/dashboard/PostsSection";

export default async function UserDashboard() {
  const user = await getUserFromCookie();

  return (
    <>
      <ProfileHeader user={user as User} />
      <PostsSection userId={user?.id as string} />
    </>
  );
}
