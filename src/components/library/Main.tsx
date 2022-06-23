import LikedVideos from "./LikedVideos";
import WatchLaterVideos from "./WatchLaterVideos";
import { useLikedVideos, useWatchLaterVideos } from "../../api/hooks/library";

export default function Main({ userId }) {
  const { likedVideos, likedVideosLoading } = useLikedVideos(userId);
  const { watchLaterVideos, watchLaterVideosLoading } =
    useWatchLaterVideos(userId);

  const loading = likedVideosLoading || watchLaterVideosLoading;

  if (!userId) return null;

  return (
    <div className="mt-7 lg:-ml-2 lg:mt-6 w-full space-y-10">
      <LikedVideos likedVideos={likedVideos} loading={loading} />
      <WatchLaterVideos watchLaterVideos={watchLaterVideos} loading={loading} />
      {!watchLaterVideos && (
        <div className="text-center mt-7">No videos saved to watch later</div>
      )}
      {!likedVideos && <div className="text-center mt-7">No liked videos</div>}
    </div>
  );
}
