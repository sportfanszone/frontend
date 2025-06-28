import ProfileHeader from "../../components/ProfileHeader";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@/types";

export default async function UserDashboard() {
  const user = await getUserFromCookie();

  return (
    <>
      <ProfileHeader user={user as User} />
    </>
  );
}
