import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

import ProfileHeader from "@/app/(pages)/components/account/AccountHeader";
import PostsSection from "@/app/(pages)/components/account/PostsSection";

export default async function UserDashboard() {
  const user = await getUserFromCookie();

  return (
    <>
      <ProfileHeader user={user as User} />
      <PostsSection />
    </>
  );
}
