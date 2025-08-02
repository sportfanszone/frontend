import ClubCardSkeleton from "@/app/(pages)/components/clubs/ClubCardSkeleton";

const ClubsPageSkeleton = () => {
  return (
    <main className="font-medium max-w-400 mx-auto">
      <section className=" max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-10">
          Clubs
        </h2>

        <div className="flex justify-center items-center flex-wrap gap-8">
          {[...Array(8)].map((_, index) => (
            <ClubCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ClubsPageSkeleton;
