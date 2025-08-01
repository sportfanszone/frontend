import Link from "next/link";
import PostSection from "@/app/(pages)/components/posts/PostSection";

import { Post } from "@/types";
import getUserPostsData from "@/lib/getUserPostsData";

type Props = {
  userId: string;
};

const PostsSection = async ({ userId }: Props) => {
  let posts: Post[] = [];

  try {
    const data = await getUserPostsData(userId);
    posts = data?.posts || [];
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    // You can return an error UI or keep it empty
    return (
      <section className="p-10 text-center text-red-600">
        Failed to load posts.
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="p-10 text-center text-gray-500">
        No posts to display.
      </section>
    );
  }

  return (
    <section className="p-10 font-medium max-w-300 mx-auto @container">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`} className="block mb-6">
          <PostSection post={post} showBackbutton={false} />
        </Link>
      ))}
    </section>
  );
};

export default PostsSection;
