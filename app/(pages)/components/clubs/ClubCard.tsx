import Image from "next/image";
import * as motion from "motion/react-client";
import { Club } from "@/types";

const ClubCard = ({
  name,
  topicCount,
  lastActivity,
  description,
  logo,
  backgroundImage,
}: Club) => {
  return (
    <motion.div className="bg-white shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 max-w-80 min-w-66 cursor-pointer transition-all duration-150 ease-in-out">
      <div
        className={`mb-4 shadow-card rounded-3xl px-5 py-6 text-white bg-cover bg-center`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="font-bold text-xl">{name}</h1>
      </div>
      <div className="flex justify0between align-center gap-3">
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">TOPICS</span>
          <span className="font-bold text-lg">{topicCount}</span>
        </div>
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">LAST ACTIVITY</span>
          <span className="font-bold text-lg">{lastActivity}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-gray-500 text-sm mb-1">DESCRIPTION</span>
        <div className="flex justify-start items-center gap-3">
          <Image
            src={logo}
            width={200}
            height={200}
            alt="Club logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-sm">{description}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;
