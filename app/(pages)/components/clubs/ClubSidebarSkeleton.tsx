import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ClubsSidebar = () => {
  return (
    <div className="border-2 border-gray-200 rounded-xl w-full h-fit">
      {/* League */}
      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <span className="text-gray-500 text-sm mb-1">
          <Skeleton width={95} />
        </span>
        <div className="flex justify-start items-center gap-3 pb-3">
          <Skeleton width={40} height={40} circle={true} />
          <span className="text-sm">
            <Skeleton width={135} count={3} />
          </span>
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
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold mb-3">
          <Skeleton width={17} height={17} />
          <span className="text-gray-700 hover:text-black">
            <Skeleton width={50} />
          </span>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold">
          <Skeleton width={17} height={17} />
          <span className="text-gray-700 hover:text-black">
            <Skeleton width={50} />
          </span>
        </div>
      </div>

      {/* User */}
      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <span className="text-gray-500 text-sm mb-1">
          <Skeleton width={95} />
        </span>
        <div className="flex justify-start items-center gap-3">
          <Skeleton width={40} height={40} circle={true} />
          <span className="text-sm">
            <Skeleton width={100} />
          </span>
        </div>
      </div>

      {/* Related Leagues*/}
      <div className="flex flex-col justify-center p-6">
        <span className="text-gray-500 text-sm mb-1">
          <Skeleton width={70} />
        </span>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex justify-start items-center gap-3">
            <Skeleton width={40} height={40} circle={true} />
            <span className="text-sm">
              <Skeleton width={135} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsSidebar;
