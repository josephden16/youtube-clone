function VideoLoadingSkeleton({ amount }) {
  const loadingSkeletonArray = Array(amount || 10)
    .fill(null)
    .map((_, index) => index);

  return (
    <>
      {loadingSkeletonArray.map((_, index) => (
        <div
          key={index}
          className="video-home animate-pulse flex flex-col space-y-2"
        >
          <div>
            <div className="skeleton-animation bg-lightGray3 dark:bg-lightGray2 text-right w-full h-44 sm:h-32 lg:h-32 rounded-2xl"></div>
          </div>
          <div>
            <div className="skeleton-animation bg-lightGray3 dark:bg-lightGray2 h-4 w-11/12 mx-1 rounded-md"></div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="skeleton-animation bg-lightGray3 dark:bg-lightGray2 h-4 w-5/6 mx-1 rounded-md"></div>
            <div className="skeleton-animation bg-lightGray3 dark:bg-lightGray2 h-4 w-full mx-1 rounded-md"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default VideoLoadingSkeleton;
