import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

export default function ChannelHomeSkeleton() {
  return (
    <section>
      <div className="mx-2">
        <div className="flex flex-col w-11/12 sm:w-96 mb-8">
          <div className="text-right static">
            <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse w-full h-48 text-center rounded-3xl"></div>
          </div>
          <div className="text-left mt-3 ml-1 lg:ml-2">
            <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-3/5 mb-3"></div>
            <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-16 w-3/4 mb-3"></div>
            <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-28 mb-3"></div>
          </div>
        </div>

        <div>
          {/* <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20 text-center sm:text-left lg:block ml-1 mb-6 font-bold text-2xl"></div> */}
          <div className="flex flex-col space-y-8 sm:grid sm:grid-cols-2 md:space-y-0 md:space-x-0 md:gap-8 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
            <VideoLoadingSkeleton amount={8} />
          </div>
        </div>
      </div>
    </section>
  );
}
