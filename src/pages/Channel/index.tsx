import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "../../components/common/Layout";
import "./channel.css";
import {
  channelDataQueryKey,
  channelVideosQueryKey,
  useChannelData,
  useChannelVideos,
} from "../../api/hooks/channel";
import { useQueryClient } from "react-query";
import ChannelData from "../../components/channel/ChannelData";
import ChannelControl from "../../components/channel/ChannelControl";

const Channel = ({ match }) => {
  const { id } = useParams<{ id: string }>();
  // class name states for each tab (updated whenever the URL changes)
  const [homeClass, setHomeClass] = useState("");
  const [videoClass, setVideoClass] = useState("");

  let location = useLocation();
  const queryClient = useQueryClient();
  const { channelData, channelDataLoading } = useChannelData(id);
  const { channelVideos, channelVideosLoading } = useChannelVideos(id);
  console.log("loading: ", channelVideosLoading);

  // make changes based on current location
  useEffect(() => {
    const defaultClass =
      "dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2";
    const activeClass = "pb-1 border-b-2 border-red dark:border-red text-red";
    switch (location.pathname) {
      case match.url:
        setHomeClass(activeClass);
        setVideoClass(defaultClass);
        break;
      case `${match.url}/videos`:
        setHomeClass(defaultClass);
        setVideoClass(activeClass);
        break;

      case `${match.url}/about`:
        setHomeClass(defaultClass);
        setVideoClass(defaultClass);
        break;

      case `${match.url}/playlists`:
        setHomeClass(defaultClass);
        setVideoClass(defaultClass);
        break;

      default:
        setHomeClass(activeClass);
        setVideoClass(defaultClass);
        break;
    }

    queryClient.invalidateQueries(channelDataQueryKey);
    queryClient.invalidateQueries(channelVideosQueryKey);
  }, [location.pathname, match.url, queryClient]);

  return (
    <Layout>
      <div className="mt-10 lg:mt-4 lg:-ml-1 flex flex-col w-full space-y-16">
        <ChannelData
          channelData={channelData}
          homeClass={homeClass}
          videoClass={videoClass}
          loading={channelDataLoading}
        />
        <ChannelControl
          match={match}
          channelData={channelData}
          channelId={id}
          channelVideos={channelVideos}
          loading={channelVideosLoading}
        />
      </div>
    </Layout>
  );
};

export default Channel;

//TODO: add discussion feature later
//TODO:  add playlist feature in the future
