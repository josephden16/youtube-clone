import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

export default function LikedVideosSkeleton() {
  return (
    <section className="border-b-1 pb-4 border-lightGray dark:border-gray w-full">
      <div className="flex flex-row w-full justify-center lg:justify-between">
        <div className="flex flex-row w-full justify-center mb-8 sm:mb-10 lg:justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="bg-lightGray3 dark:bg-lightGray2 h-4 lg:h-6 w-52 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className="mx-1 flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
        <VideoLoadingSkeleton amount={4} />
      </div>
    </section>
  );
}
