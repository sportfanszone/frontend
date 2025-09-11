"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostSection from "@/app/(pages)/components/posts/PostSection";
import { Post } from "@/types";
import { usePostStore } from "@/stores/postStore";

type Props = {
  userId: string;
  initialPosts: Post[] | null | undefined;
};

const PostsSection = ({ userId, initialPosts }: Props) => {
  const { posts, setPosts, fetchNewPosts, fetchMorePosts } = usePostStore();
  const [page, setPage] = useState(1); // Start at 1 since initialPosts is page 0
  const [hasMore, setHasMore] = useState(
    Array.isArray(initialPosts) && initialPosts.length === 10
  );
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Initialize posts
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

  // Fetch new posts every 30 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const latestPost = posts[0];
  //     fetchNewPosts(userId, latestPost?.createdAt);
  //   }, 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [posts, userId, fetchNewPosts]);

  // Infinite scrolling
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setIsLoading(true);
      fetchMorePosts(userId, page).then((hasMorePosts) => {
        setHasMore(hasMorePosts);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      });
    }
  }, [inView, hasMore, isLoading, userId, page, fetchMorePosts]);

  // Ensure posts is an array
  const safePosts = Array.isArray(posts) ? posts : [];

  if (safePosts.length === 0 && !isLoading) {
    return (
      <section className="p-10 text-center text-gray-500">
        No posts to display.
      </section>
    );
  }

  return (
    <section className="p-2 md:p-10 px-0 font-medium max-w-350 mx-auto @container">
      {safePosts.map((post, index) => (
        <PostSection
          key={index}
          className="bg-white border-2 border-gray-200 rounded-xl p-5 md:p-7.5 mb-5"
          post={post}
          showBackbutton={false}
        />
      ))}
      {isLoading && (
        <div className="text-center text-gray-500">Loading more posts...</div>
      )}
      {hasMore && !isLoading && <div ref={ref} className="h-10" />}
      {!hasMore && safePosts.length > 0 && (
        <div className="text-center text-gray-500">No more posts to load.</div>
      )}
    </section>
  );
};

export default PostsSection;
