import Image from "next/image";
import { Club } from "@/types";
import Link from "next/link";

interface LeaguesSidebarProps {
  clubs: Club[];
}

const LeaguesSidebar = async ({ clubs }: LeaguesSidebarProps) => {
  return (
    <div className="w-full h-fit">
      {/* Related Leagues */}
      {clubs && (
        <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center p-6">
          <span className="text-gray-500 text-sm mb-3">RELATED</span>
          {clubs?.length > 0 ? (
            <>
              {clubs.map((club) => (
                <Link
                  href={`/topics?club=${club.id}`}
                  key={club.id}
                  className="flex items-center gap-3 mb-2 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:bg-blue-700/10 transition-colors duration-200 px-4 py-2 rounded-lg text-gray-800 font-semibold"
                >
                  <Image
                    src={club.logo}
                    width={200}
                    height={200}
                    alt="Related league logo"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  <span className="text-sm">{club.name}</span>
                </Link>
              ))}
            </>
          ) : (
            <p>There are no related clubs</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaguesSidebar;
