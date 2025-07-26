import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSidebarSkeleton = () => {
  return (
    <div className="border-2 border-gray-200 rounded-xl w-full h-fit">
      {/* Top contributors */}
      <div className="p-6">
        <Skeleton className="mb-4" height={20} width={130} />
        <div className="flex items-center justify-center-safe flex-wrap gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} width={50} height={50} circle={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarSkeleton;
