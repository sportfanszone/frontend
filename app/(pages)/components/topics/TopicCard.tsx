import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  FiMoreHorizontal,
  FiUserPlus,
  FiBookmark,
  FiEyeOff,
  FiFlag,
  FiMessageCircle,
  FiThumbsUp,
} from "react-icons/fi";
import { TopicCardProp } from "@/types";
import UserAvatar from "@/app/components/ui/UserAvatar";

const TopicCard = ({
  topic: {
    id,
    title,
    createdAt,
    likes,
    comments,
    user: { username, firstName, middleName, lastName, profileImageUrl },
  },
}: TopicCardProp) => {
  return (
    <div className="bg-white flex cursor-pointer transition-all duration-150 ease-in-out shadow-card hover:shadow-card-active hover:scale-102  rounded-3xl">
      <div className="flex gap-4 flex-1 p-5">
        <Link
          href={`/post/${id}`}
          className="size-[7.5em] md:size-[9.5em] min-w-[7.5em] md:min-w-[9.5em] rounded-3xl block overflow-hidden"
        >
          <Image
            src="/images/postImage1.jpg"
            width={170}
            height={170}
            alt="Post Image"
            className="size-full object-cover"
          />
        </Link>

        <div>
          <Link
            href={`/post/${id}`}
            className="hover:underline hover:text-primary"
          >
            <h5 className="font-bold text-md md:text-lg line-clamp-2 mb-2">
              {title}
            </h5>
          </Link>
          <div className="flex items-center gap-5 mb-2 md:mb-4 max-w-40">
            <div className="flex justify-between items-center gap-1">
              <FiThumbsUp /> <b>{likes}</b>
            </div>
            <div className="flex justify-between items-center gap-1">
              <FiMessageCircle /> <b>{comments}</b>
            </div>
          </div>

          <Link
            href={`/account/@${username}`}
            className="flex justify-start items-center gap-3 w-fit hover:underline hover:text-primary"
          >
            <UserAvatar
              src={profileImageUrl}
              alt={`${firstName?.[0]}${lastName?.[0]}`}
              className="h-7 md:h-10 w-7 md:w-10 object-cover rounded-full"
            />
            <div className="flex flex-col justify-start items-start gap-0.5 w-fit">
              <span className="text-xs md:text-sm font-bold ">
                {firstName} {middleName} {lastName}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                {createdAt}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <Popover>
        <PopoverTrigger className="self-start p-4 cursor-pointer">
          <FiMoreHorizontal />
        </PopoverTrigger>

        <PopoverContent className="py-3">
          <div className="flex items-center gap-2 p-2 px-5 cursor-pointer hover:bg-black/10">
            <FiUserPlus /> Follow
          </div>
          <div className="flex items-center gap-2 p-2 px-5 cursor-pointer hover:bg-black/10">
            <FiBookmark /> Save
          </div>
          <div className="flex items-center gap-2 p-2 px-5 cursor-pointer hover:bg-black/10">
            <FiEyeOff /> Hide
          </div>
          <div className="flex items-center gap-2 p-2 px-5 cursor-pointer hover:bg-black/10">
            <FiFlag /> Report
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TopicCard;
