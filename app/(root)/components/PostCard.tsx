import Image from "next/image";
import { FiShare2, FiMessageCircle, FiThumbsUp } from "react-icons/fi";

type PostCardProps = {
  user: {
    username: string;
    profileImage: string;
  };
  title: string;
  description: string;
  likes: number;
  comments: number;
  upVotes: number;
  createdAt: string;
};

const PostCard = ({
  user: { username, profileImage },
  title,
  description,
  likes,
  comments,
  upVotes,
  createdAt,
}: PostCardProps) => {
  return (
    <div className="bg-white flex items-center justify-between gap-4 max-h-10em max-w-130 shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 cursor-pointer transition-all duration-150 ease-in-out">
      <Image
        src="/images/postImage1.jpg"
        width={170}
        height={170}
        alt="Post Image"
        className="w-[10.5em] h-[10.5em] object-cover rounded-3xl"
      />
      <div className="min-w-[1em] w-[18em] mxa-h-[10.5em]">
        <div className="flex justify-start items-center gap-3 mb-2 md:mb-4">
          <Image
            src={profileImage}
            width={200}
            height={200}
            alt="User porofile image"
            className="h-7 md:h-10 w-7 md:w-10 object-cover rounded-full"
          />
          <div className="flex flex-col justify-start items-center gap-0.5">
            <span className="text-xs md:text-sm font-bold ">{username}</span>
            <span className="text-xs md:text-sm text-gray-500">
              {createdAt}
            </span>
          </div>
        </div>

        <h5 className="font-bold text-md md:text-lg">{title}</h5>
        <p className="text-sm mb-2 md:mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm md:text-base">
          <div className="flex justify-between items-center gap-5">
            <div className="flex justify-between items-center gap-1">
              <FiThumbsUp /> <b>{likes}</b>
            </div>
            <div className="flex justify-between items-center gap-1">
              <FiMessageCircle /> <b>{comments}</b>
            </div>
            <div className="flex justify-between items-center gap-1">
              <FiShare2 />
            </div>
          </div>
          {/* <div className="flex justify-between items-center gap-2">
            <FiShare2 />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
