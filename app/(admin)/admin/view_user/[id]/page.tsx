export const dynamic = "force-dynamic";

import UserCard from "@/app/(admin)/components/view_user/UserCard";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  );
}
