import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function DashboardPageSkeleton() {
  return (
    <main className="font-medium max-w-400 mx-auto px-4">
      <section className="w-full max-w-300 mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-10">
          Topics
        </h2>

        <div className="flex flex-col gap-6 max-w-250 mx-auto w-full">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex gap-4 shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 cursor-pointer transition-all duration-150 ease-in-out"
            >
              <Skeleton height={150} width={150} className="rounded-3xl" />

              <div className="min-w-[1em] w-full">
                <Skeleton height={30} width="100%" className="mb-3" />
                <div className="flex justify-between items-center gap-5 mb-3 max-w-40">
                  <Skeleton
                    height={20}
                    width={30}
                    className="flex justify-between items-center gap-1"
                  />
                  <Skeleton
                    height={15}
                    width={30}
                    className="flex justify-between items-center gap-1"
                  />
                  <Skeleton
                    height={15}
                    width={40}
                    className="flex justify-between items-center gap-1"
                  />
                </div>

                <div className="flex justify-start items-center gap-3">
                  <Skeleton
                    width={40}
                    height={40}
                    circle={true}
                    className="object-cover rounded-full"
                  />
                  <div className="flex flex-col justify-start items-start gap-0.5">
                    <Skeleton
                      height={20}
                      width={100}
                      className="text-xs md:text-sm font-bold"
                    />
                    <Skeleton
                      height={20}
                      width={70}
                      className="text-xs md:text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
