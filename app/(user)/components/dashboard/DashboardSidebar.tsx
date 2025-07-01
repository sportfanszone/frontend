import Image from "next/image";
import getDashboardData from "@/lib/getDashboardData";
import { DashboardPageData } from "@/types";

const DashboardSidebar = async () => {
  try {
    const {
      profileViews,
      leaguesYouFollow,
      clubsYouFollow,
    }: DashboardPageData = await getDashboardData();

    if (!profileViews || profileViews.length === 0) {
      return <p>Failed to load sidebar</p>;
    }

    return (
      <div className="w-full h-fit">
        <div className="p-6 mb-4 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Profile views
          </span>
          <div>
            {profileViews.map(
              ({ id, firstName, middleName, lastName, profileImageUrl }) => (
                <div key={id} className="flex items-center w-ful gap-3 mb-4">
                  <Image
                    src={profileImageUrl}
                    width={200}
                    height={200}
                    alt="League logo"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  <span className="text-sm">
                    {firstName} {middleName} {lastName}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="p-6 mb-4 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Leagues you follow
          </span>
          <div>
            {leaguesYouFollow.map(({ id, name, backgroundImage }) => (
              <div key={id} className="flex items-center w-ful gap-3 mb-4">
                <Image
                  src={backgroundImage}
                  width={200}
                  height={200}
                  alt="League logo"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Clubs you follow
          </span>
          <div>
            {clubsYouFollow.map(({ id, name, backgroundImage }) => (
              <div key={id} className="flex items-center w-ful gap-3 mb-4">
                <Image
                  src={backgroundImage}
                  width={200}
                  height={200}
                  alt="League logo"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{name}</span>
              </div>
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
