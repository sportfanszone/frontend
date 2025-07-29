import PostSection from "@/app/(pages)/components/posts/PostSection";
import Comment from "@/app/(pages)/components/posts/CommentSection";

const comments = [
  {
    id: "c1f71f57-0e42-4d86-a443-2e11e6c6d1cb",
    user: {
      id: "d7eaa8ff-ef4d-4934-9c94-2461d3e878cc",
      firstName: "Sharp",
      middleName: "A.",
      lastName: "Athlete",
      username: "Sharp_Athlete_6847",
      profileImageUrl: "/profiles/sharp.jpg",
    },
    content: "The swallow to soup ratio is diabolical oga",
    replyTo: {
      id: "a3f3493c-b9fc-4d48-84b7-cbd453a89d76",
      username: "username",
      firstName: "John",
      middleName: "Doe",
      lastName: "Nnn",
      profileImageUrl: "/profiles/sharp.jpg",
    },
    replies: [
      {
        id: "00c4fc07-2f1e-4f7e-a5ed-0643946f66e0",
        user: {
          id: "2f73c47c-4c8e-49c3-9d9d-442799b05359",
          firstName: "Oojo",
          middleName: "okji",
          lastName: "Seventeen",
          username: "oojo17",
          profileImageUrl: "/profiles/oojo.jpg",
        },
        content: "My throat dried up seeing the ratio",
        replyTo: {
          id: "d7eaa8ff-ef4d-4934-9c94-2461d3e878cc",
          username: "Sharp_Athlete_6847",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
        },
      },
      {
        id: "8c2ea3e2-1000-4c64-a59d-04fdaea5064f",
        user: {
          id: "cb34c6d3-ea61-47ce-b262-1f3e3f57640f",
          firstName: "African",
          middleName: "Okojo",
          lastName: "Guyy",
          username: "African_Guyy",
          profileImageUrl: "/profiles/african.jpg",
        },
        content: "You just know his morsel is heavy AF. Diabolical too",
        replyTo: {
          id: "d7eaa8ff-ef4d-4934-9c94-2461d3e878cc",
          username: "Sharp_Athlete_6847",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
        },
      },
      {
        id: "4d245939-4e99-43c7-8125-c95e202c5652",
        user: {
          id: "6b60a92e-0134-41c7-a3f7-018105cf9f42",
          firstName: "Divine",
          middleName: "Okay",
          lastName: "Nectar",
          username: "Divine_Nectar",
          profileImageUrl: "/profiles/divine.jpg",
        },
        content: "🤣 🤣",
        replyTo: {
          id: "cb34c6d3-ea61-47ce-b262-1f3e3f57640f",
          username: "African_Guyy",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
        },
      },
    ],
  },

  {
    id: "c9a5c5ff-4f44-439c-87a2-399adce672b4",
    user: {
      id: "dcb529a4-2fd3-40e0-a62f-60c97e9e10fc",
      firstName: "Sharp",
      middleName: "A.",
      lastName: "Athlete",
      username: "Sharp_Athlete_6847",
      profileImageUrl: "/profiles/sharp.jpg",
    },
    content: "The swallow to soup ratio is diabolical oga",
    replyTo: {
      id: "dcb529a4-2fd3-40e0-a62f-60c97e9e10fc",
      username: "Sharp_Athlete_6847",
      firstName: "Sharp",
      middleName: "A.",
      lastName: "Athlete",
      profileImageUrl: "/profiles/sharp.jpg",
    },
    replies: [
      {
        id: "ed44c088-3bbf-49e7-91a0-16793e728ed3",
        user: {
          id: "e9c4b6ea-d50f-403e-85a9-c4f9b84dc6a1",
          firstName: "Oojo",
          middleName: "Okojo",
          lastName: "Seventeen",
          username: "oojo17",
          profileImageUrl: "/profiles/oojo.jpg",
        },
        content: "My throat dried up seeing the ratio",
        replyTo: {
          id: "dcb529a4-2fd3-40e0-a62f-60c97e9e10fc",
          username: "Sharp_Athlete_6847",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
        },
      },
      {
        id: "fbcf0179-028f-4e0c-93ce-cb1f33c0d6a9",
        user: {
          id: "4d963df2-f0db-4adf-a19c-0e553176e84a",
          firstName: "African",
          middleName: "Uide",
          lastName: "Guyy",
          username: "African_Guyy",
          profileImageUrl: "/profiles/african.jpg",
        },
        content: "You just know his morsel is heavy AF. Diabolical too",
        replyTo: {
          id: "e9c4b6ea-d50f-403e-85a9-c4f9b84dc6a1",
          username: "oojo17",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
        },
      },
      {
        id: "68fe9cd7-2bb2-4aa1-8d64-0dfe5ac36ea3",
        user: {
          id: "1dc4c905-7854-4e84-a7cc-d36e9c50474d",
          firstName: "Divine",
          middleName: "Flamze",
          lastName: "Nectar",
          username: "Divine_Nectar",
          profileImageUrl: "/profiles/divine.jpg",
        },
        content: "🤣 🤣",
        replyTo: {
          id: "e9c4b6ea-d50f-403e-85a9-c4f9b84dc6a1",
          username: "oojo17",
          firstName: "Sharp",
          middleName: "A.",
          lastName: "Athlete",
          profileImageUrl: "/profiles/sharp.jpg",
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
