import { ClubsTable } from "@/app/(admin)/components/all_clubs/ClubsTable";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="font-bold text-xl mb-6">All Clubs</h1>
          </div>
          <div className="px-4 lg:px-6">
            <ClubsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
