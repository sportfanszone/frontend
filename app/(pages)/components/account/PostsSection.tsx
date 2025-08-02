import Link from "next/link";
import PostSection from "@/app/(pages)/components/posts/PostSection";

import { Post } from "@/types";
import getPostsData from "@/lib/getPostsData";

const PostsSection = async () => {
  let posts: Post[] = [];

  try {
    const data = await getPostsData();
    posts = data?.posts?.posts || [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return (
      <section className="p-10 text-center text-red-600">
        Failed to load posts.
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="p-10 text-center text-gray-500">
        No posts available.
      </section>
    );
  }

  return (
    <section className="p-10 font-medium max-w-300 mx-auto @container">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="block mb-6">
          <PostSection showBackbutton={false} post={post} />
        </Link>
      ))}
    </section>
  );
};

export default PostsSection;
