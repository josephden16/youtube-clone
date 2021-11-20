import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";
import VideoUpload from "./VideoUpload";
import Video from "../common/Video";
import ChannelVideosSkeleton from "./ChannelVideosSkeleton";

export default function Videos({ id, videos, channelName, loading }) {
  const { user } = useContext(UserContext);
  
  if (loading) return <ChannelVideosSkeleton />

  return (
    <section className="mx-2">
      <div>
        {user && user.uid === id && (
          <VideoUpload channelName={channelName} channelId={id} />
        )}
      </div>
      <div>
        <h2 className="hidden lg:block mb-4 font-bold text-2xl">
          Uploads &#127909;
        </h2>
        <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
          {videos &&
            videos.map((video: any, index: number) => (
              <Video key={index} video={video} />
            ))}
          {!videos && (
            <div className="text-left">This channel has no videos</div>
          )}
        </div>
      </div>
    </section>
  );
}
