import Link from "next/link";
import PostCard from "@/app/(root)/components/PostCard";
import Post from "@/app/(pages)/components/posts/PostSection";

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

const PostsSection = () => {
  return (
    <section className="p-10 font-medium max-w-300 mx-auto @container">
      {[...Array(6)].map((_, id) => (
        <Link href={`/post/${id}`} key={id} className="block mb-6">
          <Post showBackbutton={false} />
        </Link>
      ))}
    </section>
  );
};

export default PostsSection;
