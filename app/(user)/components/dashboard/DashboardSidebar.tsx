import Image from "next/image";
import getDashboardData from "@/lib/getDashboardData";
import { DashboardPageData } from "@/types";
import UserAvatar from "@/app/components/ui/UserAvatar";
import Link from "next/link";

const DashboardSidebar = async () => {
  try {
    const {
      profileViews,
      leaguesYouFollow,
      clubsYouFollow,
    }: DashboardPageData = await getDashboardData();

    return (
      <div className="w-full h-fit">
        <div className="p-6 mb-4 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Profile views
          </span>
          {profileViews.length > 0 ? (
            <div>
              {profileViews.map(
                ({
                  id,
                  firstName,
                  middleName,
                  lastName,
                  username,
                  profileImageUrl,
                }) => (
                  <Link
                    href={`/account/@${username}`}
                    key={id}
                    className="flex items-center w-ful gap-3 mb-4 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:bg-blue-700/10 transition-colors duration-200 px-4 py-2 rounded-lg text-gray-800 font-semibold"
                  >
                    <UserAvatar
                      src={profileImageUrl}
                      alt={`${firstName?.[0]}${lastName?.[0]}`}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <span className="text-sm">
                      {firstName} {middleName} {lastName}
                    </span>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div>No profile views found</div>
          )}
        </div>

        <div className="p-6 mb-4 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Leagues you follow
          </span>
          <div>
            {leaguesYouFollow.map(({ id, name, backgroundImage }) => (
              <Link
                href={`/clubs?league=${id}`}
                key={id}
                className="flex items-center w-ful gap-3 mb-4 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:bg-blue-700/10 transition-colors duration-200 px-4 py-2 rounded-lg text-gray-800 font-semibold"
              >
                <Image
                  src={backgroundImage || "/images/gray.png"}
                  width={200}
                  height={200}
                  alt="League logo"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Clubs you follow
          </span>
          <div>
            {clubsYouFollow.map(({ id, name, backgroundImage }) => (
              <Link
                href={`/topics?club=${id}`}
                key={id}
                className="flex items-center w-ful gap-3 mb-4 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:bg-blue-700/10 transition-colors duration-200 px-4 py-2 rounded-lg text-gray-800 font-semibold"
              >
                <Image
                  src={backgroundImage || "/images/gray.png"}
                  width={200}
                  height={200}
                  alt="League logo"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch topics data:", error);
    return <p>Failed to load sidebar</p>;
  }
};

export default DashboardSidebar;
