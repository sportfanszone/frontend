import ContributorCard from "./ContributorCard";

const ClubsSidebar = () => {
  const data = {
    topContributors: [
      {
        id: 1,
        name: "John",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 2,
        name: "Jane",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 3,
        name: "Alice",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 4,
        name: "Bob",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 5,
        name: "Charlie",
        profileImage: "/images/blankProfile.png",
      },
      {
        id: 6,
        name: "Dave",
        profileImage: "/images/blankProfile.png",
      },
    ],
  };

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

export default ClubsSidebar;
