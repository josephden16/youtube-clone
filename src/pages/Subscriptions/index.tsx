import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTime, formatVideoTime, formatChannelName, formatTitle } from '../../utils';
import Layout from '../../components/Layout';
import { firestore } from '../../firebase';
import { UserContext } from '../../components/providers/AuthProvider';
import loadingImg from '../../images/loading.svg';
import './subscriptions.css';


const Subscriptions = () => {
  const user = useContext(UserContext);

  return (
    <Layout>
      {!user && null}
      {user && <Main user={user} />}
    </Layout>
  )
}

const Main = ({ user }) => {
  return (
    <div className="flex flex-col lg:-ml-3 xl:-ml-5">
      <div className="no-scrollbar ml-2 lg:ml-0">
        <Channels user={user} />
      </div>
      <div className="m-10">
        <Videos user={user} />
      </div>
    </div>
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
      <div className="grid grid-cols-1 w-full space-y-12 lg:-ml-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-12">
        {videos && videos.map((video: any, index: number) => (
          <Video key={index} video={video} />
        ))}
      </div>
      {!videos &&
        <div className="text-center text-xl">
          <span>No subscriptions</span>
        </div>
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
      <Link to={"/channel/" + channel.id} className="flex flex-col items-center space-y-1 hover:opacity-70">
        <img src={channel.channelPhotoURL} className="w-14 lg:w-14 rounded-circle" alt="channel" />
        <span className="text-xs lg:text-sm">{channel.channelDisplayName}</span>
      </Link>
    </div>
  )
}

const Channels = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const userId = user.uid;
      const subscriptionsRef = firestore.collection("users").doc(userId).collection("subscriptions").limit(5);
      try {
        const snapshot = await subscriptionsRef.get();
        const size = snapshot.docs.length;
        let subs = [];
        snapshot.docs.forEach(async (doc, index) => {
          const channelRef = firestore.collection("channels").doc(doc.id);
          const snapshot = await channelRef.get();
          const data = { id: snapshot.id, ...doc.data() };
          subs.push(data);
          if (index === size - 1) {
            setSubscriptions(subs);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubscriptions();
  }, [user]);

  if (!subscriptions) return null;

  return (
    <div className="flex flex-row space-x-4 lg:space-x-7 items-center lg:items-start overflow-hidden whitespace-nowrap">
      {subscriptions.length > 0 && subscriptions.map((channel: any, index: number) => (
        <Channel key={index} channel={channel} />
      ))}
      <button className="m-auto uppercase font-bold ml-6">see all</button>
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
          <img loading="lazy" src={video.posterURL} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
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
