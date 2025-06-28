import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

import ProfileHeader from "@/app/(user)/components/ProfileHeader";
import PostsSection from "@/app/(user)/components/PostsSection";

export default async function UserDashboard() {
  const user = await getUserFromCookie();

  return (
    <>
      <ProfileHeader user={user as User} />
      <PostsSection />
    </>
  );
}
