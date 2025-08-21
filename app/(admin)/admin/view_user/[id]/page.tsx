export const dynamic = "force-dynamic";

import getUserData from "@/lib/getUserData";
import UserCard from "@/app/(admin)/components/view_user/UserCard";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const userId = params.id as string;
    const { user } = await getUserData(userId);
    if (!user) {
      return (
        <div className="min-h-screen w-[100%] px-4 py-10">
          <p className="text-center">User not found</p>
        </div>
      );
    }
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <UserCard user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen w-[100%] px-4 py-10">
        <p>An error occured while loading user</p>
      </div>
    );
  }
}
