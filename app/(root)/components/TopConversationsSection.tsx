import PostCard from "@/app/(root)/components/PostCard";

import getTopConversationsData from "@/lib/getTopConversationsData";
import { Post } from "@/types";

const TopConversations = async () => {
  let posts: Post[] = [];

  const data = await getTopConversationsData();
  posts = data?.posts || [];

  return (
    <section className="font-medium bg-gray-800">
      <div className="w-full p-10 mx-auto max-w-300">
        <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Top Conversations
        </h2>

        <div className="flex justify-center items-center flex-wrap gap-8">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopConversations;
