import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMessageCircle, FiThumbsUp, FiShare2 } from "react-icons/fi";

type CommentType = {
  id: number;
  user: { username: string };
  content: string;
  replyTo?: { username: string };
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
        <Image
          src="/images/blankProfile.png"
          width={40}
          height={40}
          alt="User Profile"
          className="rounded-full w-10 h-10 object-cover"
        />
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
            <div className="text-sm flex justify-between items-center gap-1 cursor-pointer">
              <FiMessageCircle /> <b className="text-gray-700">9</b>
            </div>
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
