import { User } from "@/types";
import UserAvatar from "@/app/components/ui/UserAvatar";

const ContributorCard = ({
  id,
  firstName,
  lastName,
  profileImageUrl,
}: User) => {
  return (
    <div key={id} className="flex items-center flex-col gap-2">
      <UserAvatar
        src={profileImageUrl}
        alt={`${firstName?.[0]}${lastName?.[0]}`}
        className="h-10 w-10 object-cover rounded-full"
      />
      <span className="text-sm text-center font-semibold inline-block w-15 truncate">
        {firstName}
      </span>
    </div>
  );
};

export default ContributorCard;
