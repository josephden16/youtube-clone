import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTime, formatVideoTime, formatChannelName, formatTitle } from '../../utils';
import Layout from '../../components/Layout';
import { firestore } from '../../firebase';
import { UserContext } from '../../components/providers/AuthProvider';
import loadingImg from '../../images/loading.svg';
import './index.css';


const Subscriptions = () => {
  const user = useContext(UserContext);

  return (
    <Layout>
      {user &&
        <div className="w-full block lg:-ml-4">
          <div className="no-scrollbar ml-2 lg:ml-0">
            <Channels user={user} />
          </div>
          <div className="mt-10 lg:mt-12">
            <div className="mb-8">
              <h1 className="text-3xl text-center font-bold lg:text-left">Videos  &#127909;</h1>
            </div>
            <Videos user={user} />
          </div>
        </div>
      }
    </Layout>
  )
}

const Videos = ({ user }) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchVideos = () => {
      setLoading(true);
      let channelIds: string[] = [];
      const subscriptionsRef = firestore.collection("users").doc(user.uid).collection("subscriptions");
      subscriptionsRef.get()
        .then((snapshot) => {
          snapshot.docs.forEach(async doc => {
            const channelRef = firestore.collection("channels").doc(doc.id);
            channelRef.get()
              .then(snapshot => {
                const id = snapshot.id;
                channelIds = channelIds.concat(id);
                return new Promise((resolve) => {
                  resolve(channelIds)
                })
              })
              .then((channelIds: string[]) => {
                if (channelIds.length < 1) {
                  setVideos(null);
                  return;
                }
                const videosRef = firestore.collection("videos").where("channelId", "in", channelIds);
                videosRef.get()
                  .then((snapshot) => {
                    let videos = snapshot.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data()
                    }))
                    setVideos(videos);
                    setLoading(false);
                  })
              })
          });
        })
      setLoading(false);
    }

    fetchVideos()

  }, [user.uid]);

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col items-center space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
        {videos && videos.map((video: any, index: number) => (
          <Video key={index} video={video} />
        ))}
      </div>
      {
        (!videos && !loading) && <div className="text-left">No videos</div>
      }
    </>
  )
}

const Loading = () => {
  return (
    <div className="flex flex-col items-center lg:items-center lg:text-left mb-8">
      <img src={loadingImg} className="w-10 lg:w-14 text-center" alt="Loading..." />
      <span>Fetching data...</span>
    </div>
  )
}

const Channel = ({ channel }) => {
  return (
    <div>
      <Link to={"/channel/" + channel.channelId} className="flex flex-col items-center space-y-1">
        <img src={channel.channelPhotoURL} className="w-14 lg:w-16 rounded-circle" alt="channel" />
        <span className="text-xs lg:text-sm">{channel.channelName}</span>
      </Link>
    </div>
  )
}

const Channels = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptionsRef = firestore.collection("users").doc(user.uid).collection("subscriptions");
      const snapshot = await subscriptionsRef.get();
      let channels = [];
      snapshot.docs.forEach(async doc => {
        const channelRef = firestore.collection("channels").doc(doc.id);
        const snapshot = await channelRef.get();
        const data = { channelId: snapshot.id, ...snapshot.data() };
        channels = channels.concat(data);
        console.log(channels);
      });
      console.log(channels);
      setSubscriptions(channels);
    }
    fetchSubscriptions();
  }, [user.uid]); 

  if (!subscriptions) return null;

  return (
    <div className="flex flex-row flex-nowrap w-full space-x-4 lg:space-x-7 items-center lg:items-start">
      {subscriptions.length > 0 && subscriptions.map((channel: any) => (
        <Channel key={channel.channelId} channel={channel} />
      ))}
    </div>
  )
}


const Video = ({ video }) => {
  let time: string = "some time ago";

  if (video.timeUploaded) {
    time = formatTime(video.timeUploaded.seconds);
  }

  return (
    <div className="video">
      <Link to={`/watch?v=${video.id}`}>
        <div className="poster text-right static">
          <img loading="lazy" src={video.posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </Link>
      <div className="ml-2 mr-2">
        <h3 className="font-bold text-sm capitalize -mt-4">{video.title && formatTitle(video.title)}</h3>
        <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="text-sm font-bold hover:text-gray">{formatChannelName(video.channelName)}</Link></div>
        </div>
      </div>
    </div>
  )
};


export default Subscriptions;
