import ContributorCard from "@/app/(pages)/components/ContributorCard";
import getTopContributorsData from "@/lib/getTopContributorsData";

const TopicsSidebar = async () => {
  try {
    const { contributors } = await getTopContributorsData();

    if (!contributors || contributors.length === 0) {
      return <p>Failed to load sidebar</p>;
    }

    return (
      <div className="w-full h-fit">
        <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
          <span className="text-gray-500 text-sm inline-block mb-4">
            Top Contributors
          </span>
          {contributors.length > 0 ? (
            <div
              className={`flex items-center flex-wrap gap-4 ${
                contributors?.length > 2 ? "justify-center-safe" : null
              }`}
            >
              {contributors.map((contributor, id) => (
                <ContributorCard key={id} {...contributor} />
              ))}
            </div>
          ) : (
            <p>No contributors to show</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch topics data:", error);
    return <p>Failed to load sidebar</p>;
  }
};

export default TopicsSidebar;
