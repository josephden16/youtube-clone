export default function SubscriptionsSkeleton({ amount }) {
  const loadingSkeletonArray = Array(amount || 5)
    .fill(null)
    .map((_, index) => index);

  return (
    <div className={"dark:text-lightGray m-0 mt-10 space-y-4 text-gray"}>
      <div className="bg-lightGray3 dark:bg-lightGray2 animate-pulse h-5 w-44 mb-4 rounded-md"></div>
      {loadingSkeletonArray &&
        loadingSkeletonArray.map((channel: any) => (
          <div key={channel.channelId}>
            <div className="flex space-x-3 items-center">
              <div>
                <div
                  className="rounded-circle bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-32"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <div className="mt-1 text-sm bg-lightGray3 dark:bg-lightGray2 animate-pulse h-4 w-32 rounded-md">
                {channel.channelName}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
