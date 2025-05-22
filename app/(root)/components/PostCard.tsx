import Image from "next/image";
import {
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
  FiThumbsUp,
} from "react-icons/fi";

type PostCardProps = {
  user: {
    username: string;
    porofileImage: string;
  };
  title: string;
  description: string;
  likes: number;
  comments: number;
  upVotes: number;
  createdAt: string;
};

const PostCard = ({
  user: { username, porofileImage },
  title,
  description,
  likes,
  comments,
  upVotes,
  createdAt,
}: PostCardProps) => {
  return (
    <div className="shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 max-w-80 min-w-66 cursor-pointer transition-all duration-150 ease-in-out">
      <div className="flex justify-start items-center gap-3 mb-4">
        <Image
          src={porofileImage}
          width={200}
          height={200}
          alt="User porofile image"
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
      <h5 className="font-bold text-lg">{title}</h5>
      <p className="text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-5">
          <div className="flex justify-between items-center gap-1">
            <FiThumbsUp /> <b>{likes}</b>
          </div>
          <div className="flex justify-between items-center gap-1">
            <FiMessageCircle /> <b>{comments}</b>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <FiChevronUp /> <b>{upVotes}</b> <FiChevronDown />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
