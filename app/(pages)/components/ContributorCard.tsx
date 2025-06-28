import Image from "next/image";
import { User } from "@/types";

const ContributorCard = ({ id, firstName, profileImageUrl }: User) => {
  return (
    <div key={id} className="flex items-center flex-col gap-2">
      <Image
        src={profileImageUrl}
        width={50}
        height={50}
        alt="Profile"
        className="rounded-full"
      />
      <span className="text-sm text-center font-semibold inline-block w-15 truncate">
        {firstName}
      </span>
    </div>
  );
};

export default ContributorCard;
