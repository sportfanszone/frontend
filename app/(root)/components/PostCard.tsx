import Image from "next/image";
import {
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
  FiThumbsUp,
} from "react-icons/fi";

type PostCardProps = {
  leagueName: string;
  topics: number;
  lastActivity: string;
  username: string;
  logo: string;
  createdAt: string;
};

const PostCard = ({
  leagueName,
  topics,
  lastActivity,
  username,
  logo,
  createdAt,
}: PostCardProps) => {
  return (
    <div className="shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 max-w-80 min-w-66 cursor-pointer transition-all duration-150 ease-in-out">
      <div className="flex justify-start items-center gap-3 mb-4">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="League logo"
          className="h-10 w-10 object-cover rounded-full"
        />
        <div className="flex flex-col justify-start items-center gap-0.5">
          <span className="text-sm font-bold ">{username}</span>
          <span className="text-sm text-gray-500">{createdAt}</span>
        </div>
      </div>
      <Image
        src="/images/postImage1.jpg"
        width={200}
        height={200}
        alt="Post Image"
        className="h-30 w-full object-cover rounded-md mb-4"
      />
      <h5 className="font-bold text-lg">Tottenham vs Arsenal</h5>
      <p className="text-sm mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non
        deserunt magni alias.
      </p>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-between items-center gap-1">
            <FiThumbsUp /> <b>9</b>
          </div>
          <div className="flex justify-between items-center gap-1">
            <FiMessageCircle /> <b>2</b>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <FiChevronUp /> <b>20</b> <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
