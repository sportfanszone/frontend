import Image from "next/image";
import { FiCalendar, FiUsers } from "react-icons/fi";
import getClubsData from "@/lib/getClubsData";
import { ClubPageData } from "@/types";
import formatDate from "@/lib/formatDate";

import moment from "moment";

interface ClubsSidebarProps {
  leagueId: string;
}

const ClubsSidebar = async ({ leagueId }: ClubsSidebarProps) => {
  try {
    const { league, relatedLeagues }: ClubPageData = await getClubsData(
      leagueId as string
    );

    return (
      <div className="w-full h-fit">
        {/* League */}
        {league && (
          <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center mb-4 p-6">
            <span className="text-gray-500 text-sm mb-1">{league.name}</span>
            <div className="flex justify-start items-center gap-3 pb-3">
              <Image
                src={league.logo}
                width={200}
                height={200}
                alt="League logo"
                className="h-10 w-10 object-cover rounded-full"
              />
              <span className="text-sm">{league.description}</span>
            </div>
            <div className="flex justify0between align-center gap-3">
              <div className="flex flex-col justify-center mb-4">
                <span className="text-gray-500 text-sm mb-1">CLUBS</span>
                <span className="font-bold text-lg">{league.clubCount}</span>
              </div>
              <div className="flex flex-col justify-center mb-4">
                <span className="text-gray-500 text-sm mb-1">
                  LAST ACTIVITY
                </span>
                <span className="font-bold text-lg">
                  {formatDate(league.lastAccess)}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-2 text-md font-semibold mb-3">
              <FiCalendar className="inline-block text-gray-700" />
              <span className="text-gray-700 hover:text-black">
                Created {moment(league.createdAt).format("MMMM, YYYY")}
              </span>
            </div>
          </div>
        )}

        {/* Related Leagues*/}
        {relatedLeagues && (
          <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center p-6">
            <span className="text-gray-500 text-sm mb-1">RELATED</span>
            {relatedLeagues.map((league) => (
              <div
                key={league.id}
                className="flex justify-start items-center gap-3"
              >
                <Image
                  src={league.logo}
                  width={200}
                  height={200}
                  alt="Related league logo"
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{league.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <p>An error occurred while loading clubs data</p>;
  }
};

export default ClubsSidebar;
