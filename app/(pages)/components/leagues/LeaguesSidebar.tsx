import Image from "next/image";
import { Club } from "@/types";

interface ClubsSidebarProps {
  clubs: Club[];
}

const ClubsSidebar = async ({ clubs }: ClubsSidebarProps) => {
  return (
    <div className="w-full h-fit">
      {/* Related Leagues */}
      {clubs && (
        <div className="bg-white border-2 border-gray-200 rounded-xl flex flex-col justify-center p-6">
          <span className="text-gray-500 text-sm mb-3">RELATED</span>
          {clubs?.length > 0 ? (
            <>
              {clubs.map((club) => (
                <div key={club.id} className="flex items-center gap-3 mb-2">
                  <Image
                    src={club.logo}
                    width={200}
                    height={200}
                    alt="Related league logo"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  <span className="text-sm">{club.name}</span>
                </div>
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

export default ClubsSidebar;
