"use client";
import dynamic from "next/dynamic";
import { FC } from "react";
import Link from "next/link";
import { FiMessageCircle, FiThumbsUp, FiShare2 } from "react-icons/fi";
import UserAvatar from "@/app/components/ui/UserAvatar";
const CreateComment = dynamic(
  () => import("@/app/components/ui/CreateComment"),
  { ssr: false }
);

type CommentType = {
  id: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profileImageUrl: string;
  };
  content: string;
  replyTo?: {
    id: "u1";
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    profileImageUrl: string;
  };
  replies?: CommentType[];
};

interface Props {
  comment: CommentType;
  level?: number;
}

const Comment: FC<Props> = ({ comment, level = 0 }) => {
  return (
    <section className="relative pl-4 border-l-1 border-gray-400/40 max-w-180 2xl:max-w-200 mx-auto p-4 pt-0">
      <div className="flex items-start gap-3 mb-2">
        <div className="flex items-center gap-3 mb-4">
          <UserAvatar
            src={comment.user?.profileImageUrl}
            alt={`${comment.user?.firstName?.[0]}${comment.user?.lastName?.[0]}`}
            className="size-10"
          />
        </div>
        <div className="mb-2">
          <Link
            href={`/user/@${comment.user.username}`}
            className="text-sm font-semibold text-blac cursor-pointer hover:text-blue-700 transition-all"
          >
            @{comment.user.username}
            {comment.replyTo && (
              <span className="text-black/40">
                {" "}
                &gt;&gt;{" "}
                <span className="text-blue-500/60">
                  @{comment.replyTo?.username}
                </span>
              </span>
            )}
          </Link>
          <p className="text-gray-500 mb-1">{comment.content}</p>
          <div className="flex items-center gap-4">
            <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
              <FiThumbsUp /> <b className="text-gray-700">10</b>
            </div>
            <CreateComment
              replyTo={{
                firstName: comment.user?.firstName,
                middleName: comment.user?.middleName,
                lastName: comment.user?.lastName,
                username: comment.user?.username,
                profileImageUrl: comment.user?.profileImageUrl,
              }}
              replyToContent={comment?.content as string}
              parentCommentId={comment.id}
            >
              <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
                <FiMessageCircle /> <b className="text-gray-700">9</b>
              </div>
            </CreateComment>
            <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
              <FiShare2 /> <b className="text-gray-700">2</b>
            </div>
          </div>
        </div>
      </div>

      {(comment.replies ?? []).length > 0 && (
        <div className="ml-4">
          {(comment.replies ?? []).map((reply) => (
            <Comment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Comment;
