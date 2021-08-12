import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/providers/AuthProvider';
import { Link, Switch, Route, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../components/common/Layout';
import Videos from '../../components/channel/Videos';
import Home from '../../components/channel/Home';
import { firestore } from '../../firebase';
import loadingImg from '../../images/loading.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './channel.css';


const Channel = ({ match }) => {
  let { path, url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState(null);
  const user = useContext(UserContext);
  // class name states for each tab (updated whenever the URL changes)
  const [homeClass, setHomeClass] = useState("")
  const [videoClass, setVideoClass] = useState("")

  let location = useLocation();

  // changes the styles of the active tab
  useEffect(() => {
    const defaultClass = "dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2";
    const activeClass = "pb-1 border-b-2 border-red dark:border-red text-red";
    switch (location.pathname) {
      case (match.url):
        setHomeClass(activeClass);
        setVideoClass(defaultClass);
        break;
      case (`${match.url}/videos`):
        setHomeClass(defaultClass);
        setVideoClass(activeClass);
        break;

      case (`${match.url}/about`):
        setHomeClass(defaultClass);
        setVideoClass(defaultClass);
        break;

      case (`${match.url}/playlists`):
        setHomeClass(defaultClass);
        setVideoClass(defaultClass);
        break;

      default:
        setHomeClass(activeClass);
        setVideoClass(defaultClass);
        break;
    }
  }, [location.pathname, match.url])

  useEffect(() => {
    const fetchdata = async () => {
      const channelRef = firestore.collection('channels').doc(id);
      let snapshot = await channelRef.get();
      if (snapshot.exists) {
        let data = { id: snapshot.id, ...snapshot.data() };
        setData(data);
      }
    }
    const fetchChannelVideos = async () => {
      const ref = firestore
        .collection("videos")
        .where("channelId", "==", id).orderBy("timeUploaded", "desc");
      const snapshot = await ref.get();
      if (!snapshot.empty) {
        let videos = snapshot.docs.map((doc) => {
          return (
            {
              id: doc.id,
              ...doc.data()
            }
          )
        });
        setVideos(videos);
      }
    }
    fetchdata();
    fetchChannelVideos();
  }, [id]);


  const handleSubscribe = async () => {
    if (!user) {
      toast.error("You must be signed in to subscribe");
      return;
    }

    const channelId = data.id;
    const userId = user.uid;
    const userRef = firestore.collection("users").doc(userId);
    const channelRef = firestore.collection("channels").doc(channelId);
    const subscriberRef = channelRef.collection("subscribers").doc(userId);
    const snapshot = await subscriberRef.get();

    if (userId === channelId) {
      toast.warning("You can't subscribe to your own channel");
      return;
    }

    if (!(snapshot.exists)) {
      try {
        await userRef.collection("subscriptions").doc(channelId).set({
          channelId: channelId,
          channelPhotoURL: data.channelPhotoURL,
          channelDisplayName: data.channelName
        }, { merge: true })
        await subscriberRef.set({
          userId: userId,
          userDisplayName: user.displayName
        }, { merge: true });
        await channelRef.set({
          subscribersCount: data.subscribersCount + 1
        }, { merge: true });
        setData({
          ...data,
          subscribersCount: data.subscribersCount + 1
        })
        toast.success("You've subscribed to this channel");
      } catch (error) {
        console.log(error);
        toast.error("Failed to subscribe to channel");
      }
    } else {
      try {
        await subscriberRef.delete();
        await userRef.collection("subscriptions").doc(channelId).delete();
        await channelRef.set({
          subscribersCount: data.subscribersCount - 1
        }, { merge: true });
        setData({
          ...data,
          subscribersCount: data.subscribersCount - 1
        })
        toast.success("You've unsubscribed from this channel");
      } catch (error) {
        console.log(error);
        toast.error("Failed to unsubscribe from channel");
      }
    }
  }


  if (!data || !id) return (
    <div className="flex flex-col items-center h-full mt-8 lg:mt-20">
      <img src={loadingImg} className="w-12 text-center" alt="loading" />
      <span>Fetching Channel Data</span>
    </div>
  );

  return (
    <Layout>
      <div className="lg:mt-4 lg:-ml-3 flex flex-col w-full space-y-16">
        <section className="flex flex-col md:flex-row md:justify-between lg:items-center space-y-3 ml-2 lg:-ml-2 xl:-ml-1 md:mr-3">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4  lg:space-x-6">
            <div>
              <img className="w-20 lg:w-auto rounded-circle" src={data.channelPhotoURL} alt="channel owner" />
            </div>
            <div>
              <h2 className="font-bold lg:text-xl">{data.channelName}</h2>
              <div className="dark:text-lightGray">{data.subscribersCount} subscribed</div>
            </div>
          </div>
          <div>
            <button onClick={handleSubscribe} className="bg-red rounded-3xl pb-2 pt-2 pl-3 pr-3 text-white">Subscribe {data.subscribersCount}</button>
          </div>
        </section>
        <section className="ml-2 lg:ml-0 no-scrollbar w-80 sm:w-full">
          <ul className="flex flex-row m-0 p-0 space-x-6 lg:space-x-12 items-center text-sm lg:text-base dark:text-lightGray dark:border-dark">
            <Link className={homeClass} to={`${url}`}>
              Home
            </Link>
            <Link className={videoClass} to={`${url}/videos`}>
              Videos
            </Link>
            <li className="flex items-center mb-1 lg:block space-x-4">
              <button className="outline-none"><FontAwesomeIcon icon={faSearch} /></button>
              <input className="dark:bg-dark placeholder-black dark:placeholder-lightGray dark:text-lightGray border-b-2 outline-none dark:border-lightGray" type="search" placeholder="Search channel..." />
            </li>
          </ul>
        </section>
        <Switch>
          <Route path={`${match.url}/videos`} render={() => <Videos channelName={data.channelName} id={id} videos={videos} />} />
          <Route exact path={path} render={() => <Home data={data} videos={videos} />} />
        </Switch>
      </div>
    </Layout>
  )
}



export default Channel;

//TODO: add discussion feature later
//TODO:  add playlist feature in the future