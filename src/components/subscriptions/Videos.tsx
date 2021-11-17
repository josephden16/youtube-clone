import Video from "../common/Video";
import SubscriptionVideosSkeleton from "./SubscriptionVideosSkeleton";

export default function Videos({ videos, loading }) {
  if (loading) return <SubscriptionVideosSkeleton amount={12} />;

  return (
    <>
      <div className="lg:-ml-2 grid grid-cols-1 w-full space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-14">
        {videos &&
          videos.map((video: any, index: number) => (
            <Video key={index} video={video} />
          ))}
      </div>
      {!videos && (
        <div className="text-center text-xl">
          <span>No subscriptions videos</span>
        </div>
      )}
    </>
  );
}
