export default function VideoPlayerSkeleton() {
  return (
    <div>
      <div className="w-full h-48 sm:h-72 lg:h-96 mb-4 lg:rounded-lg bg-lightGray3 dark:bg-lightGray2 animate-pulse"></div>
      <div className="dark:border-gray flex flex-col ml-4 mr-4 mt-0 mb-4 lg:mt-6 border-lightGray border-b-1 space-y-3">
        <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-9 w-64 lg:w-96 rounded-lg"></div>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse text-sm text-gray lg:mt-4 lg:mb-0 mb-2 h-5 w-16 rounded-lg"></div>
          <div className="dark:text-lightGray text-gray flex flex-row mt-2 pb-6 space-x-2">
            <div
              style={{ outline: "none" }}
              className="transition-colors shadow-md bg-lightGray3 dark:bg-lightGray2 animate-pulse h-7 w-14 rounded-full"
            ></div>
            <div
              style={{ outline: "none" }}
              className="transition-colors shadow-md bg-lightGray3 dark:bg-lightGray2 animate- h-7 w-14 rounded-full"
            ></div>
            <div
              style={{ outline: "none" }}
              className="flex items-center space-x-3 transition-colors shadow-md bg-lightGray3 dark:bg-lightGray2 animate- h-7 w-14 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      <div className="transition-colors dark:border-gray ml-4 mr-4 mt-2 mb-9 pb-2 border-lightGray border-b-1">
        <div>
          <div className="flex flex-row justify-between items-center mb-3">
            <div
              className="flex flex-row space-x-3"
              style={{ alignItems: "center" }}
            >
              <div>
                <div className="rounded-circle bg-lightGray3 dark:bg-lightGray2 animate-pulse h-16 w-16" />
              </div>
              <div className="space-y-2">
                <div className="font-bold block hover:text-gray text-lg bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20 lg:w-24 rounded-lg"></div>
                <div className="dark:text-lightGray text-gray bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20 lg:w-24 rounded-lg"></div>
              </div>
            </div>
            <div className="dark:text-lightGray text-gray bg-lightGray3 dark:bg-lightGray2 animate-pulse h-5 w-20 lg:w-24 rounded-lg"></div>
          </div>
          <div className="dark:text-lightGray text-gray bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-20 lg:w-24 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
