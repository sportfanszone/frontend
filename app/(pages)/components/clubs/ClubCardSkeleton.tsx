import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ClubCardSkeleton = () => {
  return (
    <div className="shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 max-w-80 min-w-66 cursor-pointer transition-all duration-150 ease-in-out">
      <div
        className={`mb-4 shadow-card rounded-3xl px-5 py-6 text-white bg-cover bg-center`}
      >
        <Skeleton />
      </div>
      <div className="flex justify0between align-center gap-3">
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">
            <Skeleton width={60} />
          </span>
          <span className="font-bold text-lg">
            <Skeleton width={35} />
          </span>
        </div>
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">
            <Skeleton width={57} />
          </span>
          <span className="font-bold text-lg">
            <Skeleton width={110} />
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-gray-500 text-sm mb-1">
          <Skeleton width={85} />
        </span>
        <div className="flex justify-start items-center gap-3">
          <Skeleton width={40} height={40} circle={true} />
          <span className="text-sm">
            <Skeleton width={120} count={3} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClubCardSkeleton;
