import Image from "next/image";

import { AchievementCardProps } from "@/types";

const AchievementCards = ({ achievements }: AchievementCardProps) => {
  return (
    <div className="flex ml-[0.4em]">
      {achievements.map(({ name, image }, index) => (
        <div
          key={index}
          className="-m-[0.4em] w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 rounded-full overflow-hidden border-blue-800 border-2"
        >
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt={name}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

export default AchievementCards;
