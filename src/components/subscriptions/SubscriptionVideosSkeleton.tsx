import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

export default function SubscriptionVideosSkeleton({amount}) {
  return (
    <div className="grid grid-cols-1 w-full space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-14">
      <VideoLoadingSkeleton amount={amount} />
    </div>
  );
}
