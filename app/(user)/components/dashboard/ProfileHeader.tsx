import AchievementCards from "@/app/(user)/components/dashboard/AchievementCards";
import UserAvatar from "@/app/components/ui/UserAvatar";

import { ProfileHeaderProps } from "@/types";

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="relative mb-30">
      <div
        className={`h-30 sm:h-40 md:h-45 rounded-2xl overflow-hidden bg-cover bg-center`}
        style={{ backgroundImage: `url(${user?.coverPhotoUrl})` }}
      ></div>

      <div className="flex items-center flex-wrap gap-2 md:gap-4 absolute bottom-[-65%] sm:bottom-[-55%] md:bottom-[-50%] left-5 sm:left-7 md:left-8 lg:left-10 w-full">
        <div className="h-25 min-h-25 w-25 sm:h-28 sm:min-h-28 md:h-30 md:min-h-30 min-w-20 sm:w-28 sm:min-w-28 md:w-30 md:min-w-30 rounded-full overflow-hidden">
          <UserAvatar
            alt={`${user.firstName} ${user.middleName} ${user.lastName}`}
            src={user.profileImageUrl}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />

          <div className="absolute top-[30%] left-25 sm:left-28 md:left-30 max-w-max ml-3 mr-9">
            <p className="font-bold text-base md:text-xl leading-tight truncate mb-2">
              {user?.firstName} {user?.middleName} {user?.lastName}
            </p>
            <div className="text-black/90 text-xs sm:text-sm flex items-center flex-wrap gap-x-4 gap-y-2">
              <div>12.2k Followers</div>
              <div>1.2k Following</div>
              <div className="flex  items-center gap-4">
                <AchievementCards achievements={user.achievements} />{" "}
                Achievements
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
