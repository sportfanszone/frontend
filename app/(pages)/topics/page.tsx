import Link from "next/link";
import TopicCard from "@/app/(pages)/components/TopicCard";

const getTopics = async () => {
  return [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit, voluptatum.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit, tum.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum.",
      likes: 10,
      comments: 5,
      upVotes: 20,
      createdAt: "10:02AM",
      user: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Nna",
        profileImage: "/images/blankProfile.png",
      },
    },
  ];
};

export default async function TopicsPage() {
  const topics = await getTopics();
  return (
    <main className="font-medium max-w-400 mx-auto px-4">
      <section className="w-full max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
          Topics
        </h2>

        <div className="flex flex-col gap-6 max-w-250 mx-auto w-full">
          {topics.map((topic, index) => (
            <Link href={`/post/${topic.id}`} key={index}>
              <TopicCard topic={topic} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
