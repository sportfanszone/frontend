import ClubCard from "@/app/(pages)/components/clubs/ClubCard";
import Link from "next/link";
import getClubsData from "@/lib/getClubsData";
import { ClubPageData } from "@/types";

export default async function Clubs() {
  try {
    const { clubs }: ClubPageData = await getClubsData();

    if (!clubs || clubs.length === 0) {
      return <p className="text-center mt-10">No clubs available</p>;
    }

    return (
      <main className="font-medium max-w-400 mx-auto">
        <section className=" max-w-300 mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
            Clubs
          </h2>

          <div className="flex justify-center items-center flex-wrap gap-8">
            {clubs.map((club, index) => (
              <Link href={`/topics/?club=${club.id}`} key={index}>
                <ClubCard
                  id={club.id}
                  clubName={club.clubName}
                  topicCount={club.topicCount}
                  lastActivity={club.lastActivity}
                  description={club.description}
                  logo={club.logo}
                  backgroundImage={club.backgroundImage}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error fetching clubs data:", error);
    return <p>An error occured while loading clubs</p>;
  }
}
