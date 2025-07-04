import { SectionCards } from "@/app/(admin)/components/dashboard/SectionCards";

// export default function Page() {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//         <div className="bg-muted/50 aspect-video rounded-xl" />
//         <div className="bg-muted/50 aspect-video rounded-xl" />
//         <div className="bg-muted/50 aspect-video rounded-xl" />
//       </div>
//       <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
//     </div>
//   );
// }

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
