import ContributorCard from "@/app/(pages)/components/ContributorCard";
import getTopicsData from "@/lib/getTopicsData";
import { TopicPageData } from "@/types";

const TopicsSidebar = async ({ clubId }: { clubId: string }) => {
  try {
    const { topContributors }: TopicPageData = await getTopicsData(clubId);

    if (!topContributors || topContributors.length === 0) {
      return <p>Failed to load sidebar</p>;
    }

    return (
      <div className="w-full h-fit">
        <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Top Contributors
          </span>
          <div className="flex items-center justify-center-safe flex-wrap gap-4">
            {topContributors.map((contributor, id) => (
              <ContributorCard key={id} {...contributor} />
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

export default TopicsSidebar;
