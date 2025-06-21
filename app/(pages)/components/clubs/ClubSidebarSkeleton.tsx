import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ClubsSidebar = () => {
  return (
    <div className="border-2 border-gray-200 rounded-xl h-fit">
      {/* League */}
      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <Skeleton height={18} width={140} className="mb-4" />
        <div className="flex justify-start items-center gap-3 pb-3">
          <Skeleton width={40} height={40} circle={true} />
          <div className="leading-tight">
            <Skeleton height={9} width={40} />
            <Skeleton height={9} width={60} />
            <Skeleton height={9} width={80} />
          </div>
        </div>
        <div className="flex justify0between align-center gap-3">
          <div className="flex flex-col justify-center mb-4">
            <Skeleton height={15} width={47} />
            <Skeleton height={19} width={25} />
          </div>
          <div className="flex flex-col justify-center mb-4">
            <Skeleton height={15} width={90} />
            <Skeleton height={19} width={125} />
          </div>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold mb-3">
          <Skeleton height={20} width={20} />
          <Skeleton height={14} width={120} />
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold">
          <Skeleton height={20} width={20} />
          <Skeleton height={14} width={80} />
        </div>
      </div>

      {/* User */}
      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <Skeleton height={20} width={100} className="mb-1" />
        <div className="flex justify-start items-center gap-3">
          <Skeleton height={40} width={40} circle={true} />
          <Skeleton height={18} width={120} />
        </div>
      </div>

      {/* Related Leagues*/}
      <div className="flex flex-col justify-center p-6">
        <Skeleton height={20} width={80} className="mb-4" />
        {[...Array(3)].map((_, key) => (
          <div key={key} className="flex justify-start items-center gap-3">
            <Skeleton width={40} height={40} circle={true} />
            <Skeleton height={20} width={150} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsSidebar;
