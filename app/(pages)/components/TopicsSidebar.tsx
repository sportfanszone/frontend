import ContributorCard from "./ContributorCard";
import { TopicPageData } from "@/types";

type Props = {
  data: TopicPageData;
};

const TopicsSidebar = ({ data }: Props) => {
  const { topContributors } = data;

  return (
    <div className="border-2 border-gray-200 rounded-xl w-full h-fit">
      {/* Top contributors */}
      <div className="p-6">
        <span className="text-gray-500 text-sm inline-block mb-4">
          Top Contributors
        </span>
        <div className="flex items-center justify-center-safe flex-wrap gap-4">
          {topContributors.map(({ id, name, profileImage }) => (
            <ContributorCard
              key={id}
              id={id}
              name={name}
              profileImage={profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsSidebar;
