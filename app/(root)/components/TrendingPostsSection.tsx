import PostCard from "@/app/(root)/components/PostCard";
import getTrendingPostsData from "@/lib/getTrendingPostsData";
import { Post } from "@/types";

const TrendingPosts = async () => {
  let posts: Post[] = [];

  try {
    const data = await getTrendingPostsData();
    posts = data?.posts || [];
  } catch (error) {
    console.error("Failed to fetch trending posts:", error);
    return (
      <section className="p-10 font-medium max-w-300 mx-auto text-center text-red-600">
        Failed to load trending posts. Please try again later.
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="p-10 font-medium max-w-300 mx-auto text-center text-gray-500">
        No trending posts available at the moment.
      </section>
    );
  }

  return (
    <section className="p-10 font-medium max-w-300 mx-auto @container">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
        Trending Posts
      </h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export default TrendingPosts;
