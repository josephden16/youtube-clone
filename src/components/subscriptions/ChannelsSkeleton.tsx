export default function ChannelsSkeleton({ amount }) {
  const loadingSkeletonArray = Array(amount || 10)
    .fill(null)
    .map((_, index) => index);

  return (
    <>
      <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-6 w-56 rounded-md mb-3 lg:mb-6"></div>
      <div className="flex flex-row lg:ml-0 space-x-4 lg:space-x-7 items-center lg:items-start">
        {loadingSkeletonArray.map((_, index) => (
          <div
            key={index}
            className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-12 lg:h-20 w-12 lg:w-20 rounded-circle"
          ></div>
        ))}
      </div>
    </>
  );
}
