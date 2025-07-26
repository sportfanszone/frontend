import TopicCard from "@/app/(pages)/components/topics/TopicCard";
import getTopicsData from "@/lib/getTopicsData";
import { TopicPageData } from "@/types";
import BackButton from "@/app/components/ui/BackButton";

export default async function TopicsPage() {
  try {
    const { topics }: TopicPageData = await getTopicsData();

    if (!topics || topics.length === 0) {
      return <p className="text-center mt-10">No topics available</p>;
    }

    return (
      <main className="font-medium max-w-400 mx-auto px-4">
        <section className="w-full max-w-300 mx-auto">
          <div className="flex gap-3">
            <BackButton />
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
              Topics
            </h2>
          </div>

          <div className="flex flex-col gap-6 max-w-250 mx-auto w-full">
            {topics.map((topic, index) => (
              <TopicCard key={index} topic={topic} />
            ))}
          </div>
        </section>
      </main>
    );
  } catch (error) {
    return <p>An error occured while loading topics</p>;
  }
}
