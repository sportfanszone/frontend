import PostCard from "@/app/(root)/components/PostCard";

const posts = [
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
  {
    user: {
      username: "@username",
      profileImage: "/images/blankProfile.png",
    },
    title: "Tottenham vs Arsenal",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit non deserunt magni alias.",
    likes: 10,
    comments: 5,
    upVotes: 20,
    createdAt: "2 hours ago",
  },
];

const LatestPosts = () => {
  return (
    <section className="font-medium bg-gray-800">
      <div className="w-full p-10 mx-auto max-w-300">
        <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Latest Conversations
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

export default LatestPosts;
