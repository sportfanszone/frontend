"use client";
import { useState } from "react";

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
import formatDate from "@/lib/formatDate";

import Like from "@/app/components/ui/Like";

const TopicCard = ({ topic }: TopicCardProp) => {
  const [likes, setLikes] = useState<number>(topic?.likes || 0);
  const [likedByUser, setLikedByUser] = useState<boolean>(
    topic?.likedByUser || false
  );

  return (
    <div className="bg-white flex cursor-pointer transition-all duration-150 ease-in-out shadow-card hover:shadow-card-active hover:scale-102  rounded-3xl">
      <div className="flex gap-4 flex-1 p-5">
        {topic.images?.length > 0 && (
          <Link
            href={`/post/${topic.id}`}
            className="size-[7.5em] md:size-[9.5em] min-w-[7.5em] md:min-w-[9.5em] rounded-3xl block overflow-hidden"
          >
            <Image
              src={topic.images[0]}
              width={170}
              height={170}
              alt="Post Image"
              className="size-full object-cover"
            />
          </Link>
        )}

        <div>
          <Link
            href={`/post/${topic.id}`}
            className="hover:underline hover:text-primary"
          >
            <h5 className="font-bold text-md md:text-lg line-clamp-2 mb-2">
              {topic.title}
            </h5>
          </Link>
          <div className="flex items-center gap-5 mb-2 md:mb-4 max-w-40">
            {/* <div className="flex justify-between items-center gap-1">
              <FiThumbsUp /> <b>{topic.likes}</b>
            </div> */}
            <Like
              postId={topic.id}
              initialLiked={topic.likedByUser}
              initialLikeCount={topic.likes}
              onSuccess={(liked, likeCount) => {
                setLikedByUser(liked);
                setLikes(likeCount);
              }}
            />
            <div className="flex justify-between items-center gap-1">
              <FiMessageCircle /> <b>{topic.commentCount}</b>
            </div>
          </div>

          <Link
            href={`/account/@${topic.user.username}`}
            className="flex justify-start items-center gap-3 w-fit hover:underline hover:text-primary"
          >
            <UserAvatar
              src={topic.user.profileImageUrl}
              alt={`${topic.user?.firstName?.[0]}${topic.user?.lastName?.[0]}`}
              className="h-7 md:h-10 w-7 md:w-10 object-cover rounded-full"
            />
            <div className="flex flex-col justify-start items-start gap-0.5 w-fit">
              <span className="text-xs md:text-sm font-bold ">
                {topic.user.firstName} {topic.user.middleName}{" "}
                {topic.user.lastName}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                {formatDate(topic.createdAt)}
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
