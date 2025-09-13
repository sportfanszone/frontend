export const dynamic = "force-dynamic";

import PostSection from "@/app/(pages)/components/posts/PostSection";
import CommentSection from "@/app/(pages)/components/posts/CommentSection";

import getPostData from "@/lib/getPostData";
import getCommentData from "@/lib/getCommentData";

import { Post, Comment } from "@/types";

export default async function PostsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const awaitedParams = await params;
  const postId = awaitedParams?.id as string;

  const { post }: { post: Post } = await getPostData(postId);
  const { comments }: { comments: Comment[] } = await getCommentData(postId);

  return (
    <main className="font-medium max-w-400 mx-auto">
      <PostSection post={post} />
      {comments.map((comment) => (
        <CommentSection key={comment.id} comment={comment} />
      ))}
    </main>
  );
}
