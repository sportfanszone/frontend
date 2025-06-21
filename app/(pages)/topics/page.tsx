import Link from "next/link";
import TopicCard from "@/app/(pages)/components/topics/TopicCard";
import getTopicsData from "@/lib/getTopicsData";
import { TopicPageData } from "@/types";

export default async function TopicsPage() {
  const data: TopicPageData = await getTopicsData();

  if (!data || !data.topics) {
    return <p>No topics found</p>;
  }

  const { topics } = data;

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
