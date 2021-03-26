import React, { useContext, useEffect, useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Layout from '../../components/Layout';
import Authentication from '../../components/Authentication';
import Video from '../../components/Video';
import { firestore } from '../../firebase';
import { UserContext } from '../../components/providers/AuthProvider';
import loadingImg from '../../images/loading.svg';
import './subscriptions.css';


const Subscriptions = () => {
  const user = useContext(UserContext);

  return (
    <Layout>
      <Switch>
        <Route path="/subscriptions/all">
          <AllSubscriptions user={user} />
        </Route>
        <Route exact path="/subscriptions">
          {!user &&
            <div className="text-center mt-8 space-y-3">
              <div>You must be signed in to view your subscriptions</div>
              <Authentication /> 
            </div>
          }
          {user && <Main user={user} />}
        </Route>
      </Switch>
    </Layout>
  )
}

const Main = ({ user }) => {
  return (
    <div className="flex flex-col w-full lg:-ml-3 xl:-ml-5">
      <div className="no-scrollbar ml-2 lg:ml-0">
        <Channels user={user} />
      </div>
      <div className="m-10">
        <Videos user={user} />
      </div>
    </div>
  )
}

const AllSubscriptions = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const userId = user.uid;
      const subscriptionsRef = firestore.collection("users").doc(userId).collection("subscriptions");
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

  if (!user) return null;

  return (
    <div className="lg:-ml-3 w-full">
      <h1 className="text-xl lg:text-3xl font-bold">All Subscriptions &#127909;</h1>
      <div className="space-y-4 mt-7 flex flex-col lg:flex-row lg:flex-wrap lg:space-y-0 lg:space-x-4">
        {subscriptions && subscriptions.map((channel, index) => (
          <div key={index}>
            <Link to={"/channel/" + channel.id} className="flex lg:grid space-x-2 lg:grid-cols-1 lg:space-x-0 lg:place-items-center items-center space-y-1 hover:opacity-70">
              <img src={channel.channelPhotoURL} className="w-12 lg:w-14 rounded-circle" alt="channel" />
              <span className="text-base text-center lg:text-sm">{channel.channelDisplayName}</span>
            </Link>
          </div>
        ))}
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
        .catch(() => {
          setLoading(false);
          setVideos(null);
        })
      setLoading(false);
    }
    fetchVideos()

  }, [user.uid]);

  return (
    <>
      {loading && <Loading />}
      <div className="grid grid-cols-1 w-full space-y-12 lg:-ml-10 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-14">
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
        <img src={channel.channelPhotoURL} className="w-12 lg:w-14 rounded-circle" alt="channel" />
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
    <div className="flex flex-row ml-2 lg:ml-0 space-x-4 lg:space-x-7 items-center lg:items-start overflow-hidden whitespace-nowrap">
      {subscriptions.length > 0 && subscriptions.map((channel: any, index: number) => (
        <Channel key={index} channel={channel} />
      ))}
      <Link to="/subscriptions/all" className="m-auto text-xs lg:text-sm uppercase font-bold ml-6">see all</Link>
    </div>
  )
}

export default Subscriptions;
