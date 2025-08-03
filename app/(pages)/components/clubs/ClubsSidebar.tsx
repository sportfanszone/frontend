import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
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
      leagueId
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
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">CLUBS</span>
                <span className="font-bold text-lg">{league.clubCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">
                  LAST ACTIVITY
                </span>
                <span className="font-bold text-lg">
                  {formatDate(league.lastAccess)}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-2 font-semibold mt-3">
              <FiCalendar className="text-gray-700" />
              <span className="text-gray-700 hover:text-black">
                Created {moment(league.createdAt).format("MMMM, YYYY")}
              </span>
            </div>
          </div>
        )}

        {/* Related Leagues */}
        {relatedLeagues && (
          <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center p-6">
            <span className="text-gray-500 text-sm mb-3">RELATED</span>
            {relatedLeagues?.length > 0 ? (
              <>
                {relatedLeagues.map((related) => (
                  <div
                    key={related.id}
                    className="flex items-center gap-3 mb-2"
                  >
                    <Image
                      src={related.logo}
                      width={200}
                      height={200}
                      alt="Related league logo"
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <span className="text-sm">{related.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <p>There are no related leagues</p>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading clubs data:", error);
    return (
      <div className="w-full p-6 text-red-600 text-sm text-center bg-white border border-red-200 rounded-lg">
        An error occurred while loading clubs data.
      </div>
    );
  }
};

export default ClubsSidebar;
