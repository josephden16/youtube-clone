import React, { useContext, useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Switch, Route, useParams, useRouteMatch, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import VideoUpload from '../../components/VideoUpload';
import { firestore } from '../../firebase';
import { formatTime, formatVideoTime } from '../../utils';
import { UserContext } from '../../components/providers/AuthProvider';
import './index.css';


const Channel = ({ match }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { path, url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const [navOpen, setNavOpen] = useState(true);
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState(null);

  // class name states for each tab
  const [homeClass, setHomeClass] = useState("")
  const [videoClass, setVideoClass] = useState("")
  const [playlistClass, setPlaylistClass] = useState("")
  const [aboutClass, setAboutClass] = useState("")

  let location = useLocation();
  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  // changes the styles of the active tab
  useEffect(() => {
    const defaultClass = "dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2";
    const activeClass = "pb-1 border-b-2 border-red dark:border-red text-red";
    switch (location.pathname) {
      case (match.url):
        setHomeClass(activeClass);
        setAboutClass(defaultClass);
        setVideoClass(defaultClass);
        setPlaylistClass(defaultClass);
        break;
      case (`${match.url}/videos`):
        setHomeClass(defaultClass);
        setAboutClass(defaultClass);
        setVideoClass(activeClass);
        setPlaylistClass(defaultClass);
        break;

      case (`${match.url}/about`):
        setHomeClass(defaultClass);
        setAboutClass(activeClass);
        setVideoClass(defaultClass);
        setPlaylistClass(defaultClass);
        break;

      case (`${match.url}/playlists`):
        setHomeClass(defaultClass);
        setAboutClass(defaultClass);
        setVideoClass(defaultClass);
        setPlaylistClass(activeClass);
        break;

      default:
        setHomeClass(activeClass);
        setAboutClass(defaultClass);
        setVideoClass(defaultClass);
        setPlaylistClass(defaultClass);
        break;
    }
  }, [location.pathname, match.url])

  useEffect(() => {
    const fetchChannelData = async () => {
      const channelRef = firestore.collection('channels').doc(id);
      let snapshot = await channelRef.get();
      if (snapshot.exists) {
        let data = snapshot.data();
        setData(data);
      }
    }
    const fetchChannelVideos = async () => {
      const ref = firestore
        .collection("videos")
        .where("channelId", "==", id).orderBy("views", "desc");
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
    fetchChannelData();
    fetchChannelVideos();
  }, [id]);


  if (!data || !id) return null;

  return (
    <>
      <div className="dark:bg-dark h-full md:pt-1 ml-2 mr-2 pb-20 lg:mr-4 lg:ml-4 transition-all duration-300">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex mt-10 lg:mt-8 md:space-x-8 lg:space-x-6 xl:space-x-16">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar transition-transform'}>
            <SideBar />
          </div>
          <main className="lg:mt-4 w-full flex flex-col space-y-16">
            <section className="flex flex-col md:flex-row md:justify-between space-y-3 ml-1 lg:ml-0 md:mr-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 lg:space-x-6">
                <div>
                  <img className="w-20 lg:w-auto rounded-circle" src={data.channelPhotoURL} alt="channel owner" />
                </div>
                <div>
                  <h2 className="font-bold lg:text-xl">{data.channelName}</h2>
                  <div className="dark:text-lightGray">{data.subscribersCount} subscribed</div>
                </div>
              </div>
              <div>
                {/* <button>
                  <FontAwesomeIcon icon={faBell} />
                </button> */}
                <button className="bg-red rounded-3xl pb-2 pt-2 pl-3 pr-3 text-white">Subscribe {data.subscribersCount}</button>
              </div>
            </section>
            <section className="ml-2 lg:ml-0 overflow-scroll no-scrollbar">
              <ul className="flex flex-row m-0 p-0 space-x-6 lg:space-x-12 items-center text-sm lg:text-base dark:text-lightGray dark:border-dark">
                <Link className={homeClass} to={`${url}`}>
                  Home
                  </Link>
                <Link className={videoClass} to={`${url}/videos`}>
                  Videos
                  </Link>
                <Link className={playlistClass} to={`${url}/playlists`}>
                  Playlists
                  </Link>
                <Link className={aboutClass} to={`${url}/about`}>
                  About
                  </Link>
                <li className="flex items-center mb-1 lg:block space-x-4">
                  <button className="outline-none"><FontAwesomeIcon icon={faSearch} /></button>
                  <input className="dark:bg-dark dark:text-lightGray border-b-2 outline-none dark:border-lightGray" type="search" placeholder="Search channel..." />
                </li>
              </ul>
            </section>
            <Switch>
              <Route path={`${match.url}/playlists`} component={Playlist} />
              <Route path={`${match.url}/about`} component={About} />
              <Route path={`${match.url}/videos`} render={() => <Videos channelName={data.channelName} id={id} videos={videos} />} />
              <Route exact path={path} render={() => <Home data={data} videos={videos} />} />
            </Switch>
          </main>
        </div>
      </div>
      <MobileFooter />
    </>
  )
}

//Tabs
const Home = ({ data, videos }) => {

  if (!(videos && data)) return null;

  let time: string = "some time ago";

  if (videos[0].timeUploaded) {
    time = formatTime(videos[0].timeUploaded.seconds);
  }
  return (
    <section>
      {videos && <div>
        <div className="flex flex-col lg:items-center mb-8 lg:flex-row lg:space-x-6">
          <div className="poster text-right static">
            <img loading="lazy" src={videos[0].posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
            <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(videos[0].duration, 10))}</span>
          </div>
          <div className="text-left ml-1 lg:ml-0">
            <h2 className="font-bold text-2xl lg:text-xl mb-3">{videos[0].title}</h2>
            <p className="dark:text-lightGray mb-3">
              {videos[0].description}
            </p>
            <p className="dark:text-lightGray text-sm mb-3">
              {videos[0].views} views  ·  {time}
            </p>
          </div>
        </div>

        <div>
          <h2 className="lg:block ml-1 mb-4 font-bold text-2xl">{data.channelName} Videos &#127909;</h2>
          <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
            {videos && videos.map((video, index) => (
              <Video key={index} video={video} />
            ))}
          </div>
        </div>
      </div>}
      {
        !videos && <div className="text-left">This channel has no videos</div>
      }
    </section>
  )
}

const Playlist = () => {
  return (
    <div className="text-center text-sm">This channel has no playlists</div>
  )
}

const About = () => {
  return <div className="text-center text-sm">About Section</div>
}

const Videos = ({ id, videos, channelName }) => {
  let user = useContext(UserContext);
  return (
    <section>
      <div>
        {(user && user.uid === id) && <VideoUpload channelName={channelName} channelId={id} />}
      </div>
      <div>
        <h2 className="hidden lg:block mb-4 font-bold text-2xl">Uploads &#127909;</h2>
        <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
          {videos && videos.map((video, index) => (
            <Video key={index} video={video} />
          ))}
          {
            !videos && <div className="text-left">This channel has no videos</div>
          }
        </div>
      </div>
    </section>
  )
}

//components
const Video = ({ video }) => {
  let time: string = "some time ago";

  if (video.timeUploaded) {
    time = formatTime(video.timeUploaded.seconds);
  }

  return (
    <div className="lg:w-60 xl:w-64">
      <a href={`/watch?v=${video.id}`}>
        <div className="poster text-right static">
          <img loading="lazy" src={video.posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </a>
      <div className="ml-2 mr-2">
        <h3 className="font-bold text-sm capitalize -mt-4">{video.title}</h3>
        <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="text-sm font-bold hover:text-gray">Joseph</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Channel;
//TODO: add discussion tab later