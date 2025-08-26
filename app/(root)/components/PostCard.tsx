"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { FiShare2, FiMessageCircle, FiThumbsUp } from "react-icons/fi";
import UserAvatar from "@/app/components/ui/UserAvatar";

const Like = dynamic(() => import("@/app/components/ui/Like"), { ssr: false });
const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);

import { PostCardProps } from "@/types";
import formatDate from "@/lib/formatDate";

const PostCard = (post: PostCardProps) => {
  const [commentCount, setCommentCount] = useState<number>(
    post?.commentCount || 0
  );
  const [likes, setLikes] = useState<number>(post?.likes || 0);
  const [likedByUser, setLikedByUser] = useState<boolean>(
    post?.likedByUser || false
  );

  return (
    <div className="bg-white flex items-center justify-between gap-4 w-full max-h-[8em] shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 cursor-pointer transition-all duration-150 ease-in-out">
      {post.images?.length > 0 ? (
        <Image
          src={post.images[0]}
          width={120}
          height={120}
          alt="Post Image"
          className="w-[7.5em] h-[7.5em] object-cover rounded-3xl"
        />
      ) : (
        <Image
          src="/images/gray.png"
          width={120}
          height={120}
          alt="Post Image"
          className="w-[7.5em] h-[7.5em] object-cover rounded-3xl"
        />
      )}
      <div className="flex-1 min-w-0 max-h-[7.5em]">
        <div className="flex justify-start items-center gap-3 mb-2">
          <UserAvatar
            src={post.user.profileImageUrl}
            alt={`${post.user?.firstName?.[0]}${post.user?.lastName?.[0]}`}
            className="h-7 w-7 object-cover rounded-full"
          />
          <div className="flex flex-col justify-start gap-0.5">
            <span className="text-xs font-bold">{post.user?.username}</span>
            <span className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>

        <h5 className="font-bold text-sm">{post.title}</h5>
        <div className="flex justify-between items-center text-sm">
          <div className="flex justify-between items-center gap-5">
            <Like
              postId={post.id}
              initialLiked={post.likedByUser}
              initialLikeCount={post.likes}
              onSuccess={(liked, likeCount) => {
                setLikedByUser(liked);
                setLikes(likeCount);
              }}
            />
            <CreateComment
              replyTo={post.user}
              replyToContent={post.content}
              postId={post.id}
              onSuccess={() => setCommentCount((prev) => prev + 1)}
            >
              <div className="flex justify-between items-center gap-1">
                <FiMessageCircle className="text-base" /> <b>{commentCount}</b>
              </div>
            </CreateComment>

            <div className="flex justify-between items-center gap-1">
              <FiShare2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
