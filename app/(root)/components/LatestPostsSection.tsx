import PostCard from "@/app/(root)/components/PostCard";

const posts = [
  {
    user: {
      username: "@username",
      porofileImage: "/images/blankProfile.png",
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
      porofileImage: "/images/blankProfile.png",
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
      porofileImage: "/images/blankProfile.png",
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
      porofileImage: "/images/blankProfile.png",
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
      porofileImage: "/images/blankProfile.png",
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
      porofileImage: "/images/blankProfile.png",
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
    <section className="p-10 font-medium max-w-300 mx-auto @container">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
        Latest Posts
      </h2>

      <div className="flex justify-center items-center flex-wrap gap-8">
        {posts.map((post, index) => (
          <PostCard
            user={post.user}
            title={post.title}
            description={post.description}
            likes={post.likes}
            comments={post.comments}
            upVotes={post.upVotes}
            createdAt={post.createdAt}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
