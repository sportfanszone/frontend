import ProfileHeader from "../../components/ProfileHeader";
import { getUserFromCookie } from "@/lib/auth";
// import getDashboardData from "@/lib/getDashboardData";
import { User } from "@/types";

export default async function UserDashboard() {
  //   const data = await getDashboardData();
  const user = await getUserFromCookie();

  return (
    <>
      <ProfileHeader user={user as User} />
    </>
  );
}
