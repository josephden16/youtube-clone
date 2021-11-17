export default function CommentsSkeleton({ amount }) {
  const loadingSkeletonArray = Array(amount || 10)
    .fill(null)
    .map((_, index) => index);

  return (
    <div className="space-y-8 ml-2 lg:ml-0">
      {loadingSkeletonArray.map((_, index) => (
        <Comment key={index} />
      ))}
    </div>
  );
}

const Comment = () => {
  return (
    <div className="flex flex-col space-y-1 gap-2 mt-4 lg:mt-10 ml-2 mr-2">
      <div>
        <div className="rounded-circle bg-lightGray3 dark:bg-lightGray2 animate-pulse w-8 h-8 lg:h-10 lg:w-10"></div>
      </div>
      <div className="flex flex-col space-y-2 flex-wrap">
        <div className="flex-row flex text-xs lg:text-sm space-x-2">
          <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-3 w-20 rounded-lg"></div>
          <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-3 w-14 rounded-lg"></div>
        </div>
        <div className="text-sm lg:text-base">
          <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-16 w-72 rounded-lg"></div>
        </div>
        <div className="dark:text-lightGray text-gray flex items-center space-x-2">
          <div className="text-sm"></div>
        </div>
      </div>
    </div>
  );
};
