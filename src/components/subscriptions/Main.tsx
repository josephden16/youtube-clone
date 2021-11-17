import {
  useUserSubscriptionVideos,
  useUserSubscriptions,
} from "../../api/hooks/subscription";
import Channels from "./Channels";
import Videos from "./Videos";

export default function Main({ userId }) {
  const { videos, videosLoading } = useUserSubscriptionVideos(userId);
  const { subscriptions, subscriptionsLoading } = useUserSubscriptions(userId);

  return (
    <div className="flex flex-col w-full mt-6 space-y-10">
      <div className="no-scrollbar ml-2 lg:ml-0">
        <Channels
          subscriptions={subscriptions}
          loading={subscriptionsLoading}
        />
      </div>
      <div className="mx-2 mt-2">
        <Videos videos={videos} loading={videosLoading} />
      </div>
    </div>
  );
}
