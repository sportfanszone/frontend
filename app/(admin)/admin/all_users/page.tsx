import { SectionCards } from "@/app/(admin)/components/dashboard/SectionCards";
import { VisitorsChart } from "@/app/(admin)/components/dashboard/VisitorsChart";
import { UsersTable } from "@/app/(admin)/components/dashboard/NewUsers";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <SectionCards />
          <div className="px-4 lg:px-6">
            <VisitorsChart />
          </div>
          <div className="px-4 lg:px-6">
            <UsersTable />
          </div> */}
        </div>
      </div>
    </div>
  );
}
