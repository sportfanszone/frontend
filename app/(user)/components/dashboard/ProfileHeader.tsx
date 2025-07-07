import Image from "next/image";
import AchievementCards from "@/app/(user)/components/dashboard/AchievementCards";

import { ProfileHeaderProps } from "@/types";

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const seed = encodeURIComponent(fullName);
  const url =
    user.profileImageUrl ||
    `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;
  return (
    <div className="relative mb-12">
      <div
        className={`h-30 sm:h-40 md:h-45 rounded-2xl overflow-hidden bg-cover bg-center`}
        style={{ backgroundImage: `url(${user?.coverPhotoUrl})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/90 from-10% to-transparent to-90%" />
      </div>

      <div className="flex items-center flex-wrap absolute bottom-0 left-5 sm:left-7 md:left-8 lg:left-10 translate-y-[50%]">
        <div className="h-20 min-h-20 sm:h-28 sm:min-h-28 md:h-30 md:min-h-30 w-20 min-w-20 sm:w-28 sm:min-w-28 md:w-30 md:min-w-30  rounded-full overflow-hidden">
          <Image
            src={url}
            alt="Profile Photo"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-bold text-base md:text-xl text-white p-2 py-2 sm:p-3 md:p-4">
            {user?.firstName} {user?.middleName} {user?.lastName}
          </p>
          <div className="text-black/90 text-xs sm:text-sm flex items-center gap-4 sm:gap-5 md:gap-6 p-2 py-1 sm:p-3 md:p-4">
            <div>12.2k Followers</div>
            <div>1.2k Following</div>
            <div className="flex  items-center gap-4">
              <AchievementCards achievements={user.achievements} /> Achievements
            </div>
            {/* <div>Joined 2nd Jan 1972</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
