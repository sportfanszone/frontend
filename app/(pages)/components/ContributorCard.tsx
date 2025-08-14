import { User } from "@/types";
import UserAvatar from "@/app/components/ui/UserAvatar";
import Link from "next/link";

const ContributorCard = ({
  id,
  firstName,
  lastName,
  username,
  profileImageUrl,
}: User) => {
  return (
    <Link
      href={`/account/@${username}`}
      key={id}
      className="flex items-center flex-col gap-2 hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:bg-blue-700/10 transition-colors duration-200 rounded-lg text-gray-800 font-semibold"
    >
      <UserAvatar
        src={profileImageUrl}
        alt={`${firstName?.[0]}${lastName?.[0]}`}
        className="h-10 w-10 object-cover rounded-full"
      />
      <span className="text-sm text-center font-semibold inline-block w-15 truncate">
        {firstName}
      </span>
    </Link>
  );
};

export default ContributorCard;
