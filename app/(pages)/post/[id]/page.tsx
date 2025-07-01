import PostSection from "@/app/(pages)/components/posts/PostSection";
import Comment from "@/app/(pages)/components/posts/CommentSection";

const comments = [
  {
    id: 1,
    user: { username: "Sharp_Athlete_6847" },
    content: "The swallow to soup ratio is diabolical oga",
    replies: [
      {
        id: 2,
        user: { username: "oojo17" },
        content: "My throat dried up seeing the ratio",
      },
      {
        id: 3,
        user: { username: "African_Guyy" },
        content: "You just know his morsel is heavy AF. Diabolical too",
      },
      {
        id: 4,
        user: { username: "Divine_Nectar" },
        content: "🤣 🤣",
      },
    ],
  },
  {
    id: 2,
    user: { username: "Sharp_Athlete_6847" },
    content: "The swallow to soup ratio is diabolical oga",
    replies: [
      {
        id: 2,
        user: { username: "oojo17" },
        content: "My throat dried up seeing the ratio",
      },
      {
        id: 3,
        user: { username: "African_Guyy" },
        content: "You just know his morsel is heavy AF. Diabolical too",
      },
      {
        id: 4,
        user: { username: "Divine_Nectar" },
        content: "🤣 🤣",
      },
    ],
  },
];

export default function PostsPage() {
  return (
    <main className="font-medium max-w-400 mx-auto">
      <PostSection />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </main>
  );
}
