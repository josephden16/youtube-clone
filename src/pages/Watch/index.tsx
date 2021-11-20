import { useState } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/watch/VideoPlayer";
import RelatedVideos from "../../components/watch/RelatedVideos";
import Layout from "../../components/common/Layout";
import { useRelatedVideos, useVideo, watchVideoQueryKey } from "../../api/hooks/watch";
import "./watch.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Watch = () => {
  let query = useQuery();
  let videoId = query.get("v");
  const [checked, setCheck] = useState(false);
  const { videoLoading, data } = useVideo(videoId);
  const { relatedVideosLoading, relatedVideos } = useRelatedVideos(videoId);
  const handleSwitch = () => {
    setCheck(!checked);
  };

  return (
    <Layout>
      <main className="layout mt-3 lg:-ml-1 lg:mt-10 w-full lg:space-x-10">
        <VideoPlayer
          autoplay={checked}
          nextVideoId={relatedVideos ? relatedVideos[0]?.id : ""}
          channelData={data?.channelData}
          videoId={videoId}
          data={data?.videoData}
          loading={videoLoading}
          queryKey={watchVideoQueryKey}
        />
        <RelatedVideos
          relatedVideos={relatedVideos}
          checked={checked}
          handleSwitch={handleSwitch}
          loading={relatedVideosLoading}
        />
      </main>
    </Layout>
  );
};

export default Watch;
//TODO: Add  ability to delete comments
