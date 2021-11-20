export default function ChannelDataSkeleton() {
  return (
    <section className="mx-2">
      <div className="flex flex-col md:flex-row md:justify-between lg:items-center space-y-4 ml-2 lg:-ml-2 xl:-ml-1 md:mr-3">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 lg:space-y-0 md:space-x-4  lg:space-x-6">
          <div>
            <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse w-20 h-20 lg:w-24 lg:h-24 rounded-circle"></div>
          </div>
          <div className="space-y-2">
            <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-28 font-bold lg:text-xl"></div>
            <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20 dark:text-lightGray"></div>
          </div>
        </div>
        <div>
          <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse rounded-3xl h-10 w-28 text-white"></div>
        </div>
      </div>
      <div className="ml-2 lg:ml-0 no-scrollbar w-80 sm:w-full mt-10">
        <div className="flex flex-row m-0 p-0 space-x-6 lg:space-x-12 items-center text-sm lg:text-base dark:text-lightGray dark:border-dark">
          <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20"></div>
          <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20"></div>
          <div className="rounded-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-28 lg:w-36"></div>
        </div>
      </div>
    </section>
  );
}
