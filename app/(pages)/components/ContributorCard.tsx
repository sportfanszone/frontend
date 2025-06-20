import Image from "next/image";
type ContributorCardType = {
  id: string | number;
  name: string;
  profileImage: string;
};

const ContributorCard = ({ id, name, profileImage }: ContributorCardType) => {
  return (
    <div key={id} className="flex items-center flex-col gap-2">
      <Image
        src={profileImage}
        width={50}
        height={50}
        alt="Profile"
        className="rounded-full"
      />
      <span className="text-sm text-center font-semibold inline-block w-15 truncate">
        {name}
      </span>
    </div>
  );
};

export default ContributorCard;
