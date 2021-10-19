function VideoLoadingSkeleton() {
  return (
    <div className="video-home animate-pulse flex flex-col space-y-5">
      <div>
        <div className="skeleton-animation bg-lightGray dark:bg-lightGray2 text-right w-full h-44 sm:h-32 lg:h-32 rounded-3xl">
        </div>
      </div>
      <div className="ml-2 mr-1">
        <div className="font-bold text-sm capitalize -mt-4"></div>
        <div className="skeleton-animation bg-lightGray dark:bg-lightGray2 h-4 w-11/12 lg:w-4/5 mr-1 float-right rounded-2xl"></div>
      </div>
    </div>
  )
}

export default VideoLoadingSkeleton;
