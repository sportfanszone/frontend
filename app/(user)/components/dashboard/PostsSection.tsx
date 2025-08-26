"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostSection from "@/app/(pages)/components/posts/PostSection";
import { Post } from "@/types";
import clientFetcher from "@/lib/clientFetcher";
import { Post as PostType } from "@/types";

type Props = {
  userId: string;
  initialPosts: Post[];
};

const PostsSection = ({ userId, initialPosts }: Props) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1); // Start at 1 since initialPosts is page 0
  const [hasMore, setHasMore] = useState(initialPosts.length === 10);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response: { posts: PostType[] } = await clientFetcher(
        `${
          process.env.NEXT_PUBLIC_DOMAIN_URL
        }/api/user/get_user_posts/${userId}?offset=${page * 10}&limit=10`,
        "GET"
      );

      const newPosts = response.posts || [];
      if (newPosts.length < 10) {
        setHasMore(false);
      }
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMorePosts();
    }
  }, [inView, hasMore, isLoading]);

  if (posts.length === 0 && !isLoading) {
    return (
      <section className="p-10 text-center text-gray-500">
        No posts to display.
      </section>
    );
  }

  return (
    <section className="p-2 md:p-10 px-0 font-medium max-w-350 mx-auto @container">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`} className="block mb-6">
          <PostSection
            className="bg-white border-2 border-gray-200 rounded-xl p-5 md:p-7.5"
            post={post}
            showBackbutton={false}
          />
        </Link>
      ))}
      {isLoading && (
        <div className="text-center text-gray-500">Loading more posts...</div>
      )}
      {hasMore && !isLoading && <div ref={ref} className="h-10" />}
      {!hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500">No more posts to load.</div>
      )}
    </section>
  );
};

export default PostsSection;
