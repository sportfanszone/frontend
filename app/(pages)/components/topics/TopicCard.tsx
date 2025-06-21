import Image from "next/image";
import {
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
  FiThumbsUp,
} from "react-icons/fi";
import { Topic } from "@/types";

type Prop = {
  topic: Topic;
};

const TopicCard = ({
  topic: {
    id,
    title,
    createdAt,
    likes,
    comments,
    upVotes,
    user: { firstName, middleName, lastName, profileImage },
  },
}: Prop) => {
  return (
    <div className="flex gap-4 shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 cursor-pointer transition-all duration-150 ease-in-out">
      <Image
        src="/images/postImage1.jpg"
        width={170}
        height={170}
        alt="Post Image"
        className="w-[9.5em] h-[9.5em] object-cover rounded-3xl"
      />

      <div className="min-w-[1em]">
        <h5 className="font-bold text-md md:text-lg line-clamp-2 mb-2">
          {title}
        </h5>
        <div className="flex justify-between items-center gap-5 md:mb-4 max-w-40">
          <div className="flex justify-between items-center gap-1">
            <FiThumbsUp /> <b>{likes}</b>
          </div>
          <div className="flex justify-between items-center gap-1">
            <FiMessageCircle /> <b>{comments}</b>
          </div>
          <div className="flex justify-between items-center gap-2">
            <FiChevronUp /> <b>{upVotes}</b> <FiChevronDown />
          </div>
        </div>

        <div className="flex justify-start items-center gap-3">
          <Image
            src={profileImage}
            width={200}
            height={200}
            alt="User porofile image"
            className="h-7 md:h-10 w-7 md:w-10 object-cover rounded-full"
          />
          <div className="flex flex-col justify-start items-start gap-0.5">
            <span className="text-xs md:text-sm font-bold ">
              {firstName} {middleName} {lastName}
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              {createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
