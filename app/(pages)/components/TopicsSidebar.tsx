import Image from "next/image";
import { FiCalendar, FiUsers } from "react-icons/fi";

const ClubsSidebar = () => {
  return (
    <div className="border-2 border-gray-200 rounded-xl h-fit">
      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <span className="text-gray-500 text-sm mb-1">Manchester City</span>
        <div className="flex justify-start items-center gap-3 pb-3">
          <Image
            src="/images/manchesterCityLogo.png"
            width={200}
            height={200}
            alt="League logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className="flex justify0between align-center gap-3">
          <div className="flex flex-col justify-center mb-4">
            <span className="text-gray-500 text-sm mb-1">TOPICS</span>
            <span className="font-bold text-lg">38</span>
          </div>
          <div className="flex flex-col justify-center mb-4">
            <span className="text-gray-500 text-sm mb-1">LAST ACTIVITY</span>
            <span className="font-bold text-lg">Today, May 10th</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold mb-3">
          <FiCalendar className="inline-block text-gray-700" />
          <span className="text-gray-700 hover:text-black">
            Created May 3, 2025
          </span>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold">
          <FiUsers className="inline-block text-gray-700" />
          <span className="text-gray-700 hover:text-black">Members 225k</span>
        </div>
      </div>

      <div className="flex flex-col justify-center border-black/20 border-b-2 p-6">
        <span className="text-gray-500 text-sm mb-1">USER PROFILE</span>
        <div className="flex justify-start items-center gap-3">
          <Image
            src="/images/blankProfile.png"
            width={200}
            height={200}
            alt="League logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
            culpa?
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6">
        <span className="text-gray-500 text-sm mb-1">Related Topics</span>
        <div className="pl-3">
          <span className="text-sm truncate-ellipsis">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
            culpa?
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClubsSidebar;
