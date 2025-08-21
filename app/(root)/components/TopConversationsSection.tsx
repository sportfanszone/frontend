import PostCard from "@/app/(root)/components/PostCard";
import getTopConversationsData from "@/lib/getTopConversationsData";
import { Post } from "@/types";

const TopConversations = async () => {
  let posts: Post[] = [];

  try {
    const data = await getTopConversationsData();
    posts = data?.posts || [];
  } catch (error) {
    console.error("Failed to fetch top conversations:", error);
    return (
      <section className="font-medium bg-gray-800 text-center py-20 text-red-500">
        Failed to load top conversations. Please try again later.
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="font-medium bg-gray-800 text-center py-20 text-white">
        No conversations available at the moment.
      </section>
    );
  }

  return (
    <section className="font-medium bg-primary-gradient">
      <div className="w-full p-10 mx-auto max-w-300">
        <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Top Conversations
        </h2>

        <div className="flex flex-col items-center gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopConversations;
