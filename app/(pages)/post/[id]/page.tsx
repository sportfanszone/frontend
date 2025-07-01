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
        replyTo: {
          username: "Sharp_Athlete_6847",
        },
      },
      {
        id: 3,
        user: { username: "African_Guyy" },
        content: "You just know his morsel is heavy AF. Diabolical too",
        replyTo: {
          username: "Sharp_Athlete_6847",
        },
      },
      {
        id: 4,
        user: { username: "Divine_Nectar" },
        content: "🤣 🤣",
        replyTo: {
          username: "African_Guyy",
        },
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
        replyTo: {
          username: "Sharp_Athlete_6847",
        },
      },
      {
        id: 3,
        user: { username: "African_Guyy" },
        content: "You just know his morsel is heavy AF. Diabolical too",
        replyTo: {
          username: "oojo17",
        },
      },
      {
        id: 4,
        user: { username: "Divine_Nectar" },
        content: "🤣 🤣",
        replyTo: {
          username: "oojo17",
        },
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
