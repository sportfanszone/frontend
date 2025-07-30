import Link from "next/link";
import PostSection from "@/app/(pages)/components/posts/PostSection";

import { Post } from "@/types";
import getPostsData from "@/lib/getPostsData";

const PostsSection = async () => {
  const { posts }: { posts: Post[] } = (await getPostsData())?.posts;
  console.log(posts);

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
