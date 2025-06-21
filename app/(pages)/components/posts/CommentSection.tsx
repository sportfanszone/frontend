import { FC } from "react";
import Image from "next/image";
import { FiMessageCircle, FiThumbsUp, FiShare2 } from "react-icons/fi";

type CommentType = {
  id: number;
  user: { username: string };
  content: string;
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
          <p className="text-sm font-semibold text-blac">
            {comment.user.username}
          </p>
          <p className="text-gray-500 mb-1">{comment.content}</p>
          <div className="flex items-center gap-4">
            <div className="text-sm flex justify-between items-center gap-1">
              <FiThumbsUp /> <b className="text-gray-700">10</b>
            </div>
            <div className="text-sm flex justify-between items-center gap-1">
              <FiMessageCircle /> <b className="text-gray-700">9</b>
            </div>
            <div className="text-sm flex justify-between items-center gap-1">
              <FiShare2 /> <b className="text-gray-700">Sshare</b>
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
