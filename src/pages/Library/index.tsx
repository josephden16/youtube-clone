import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import { UserContext } from '../../components/providers/AuthProvider';
import { firestore } from '../../firebase';
import { formatTime, formatVideoTime } from '../../utils';


const Library = () => {
  const [navOpen, setNavOpen] = useState(true);
  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  const user = useContext(UserContext);

  return (
    <div>
      <div className="dark:bg-dark h-full md:pt-0 ml-2 mr-2 pb-20 lg:mr-4 lg:ml-4 transition-all duration-300">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex mt-10 lg:mt-8 md:space-x-8 lg:space-x-11 xl:space-x-14">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar transition-transform'}>
            <SideBar />
          </div>
          <main>
            {!user && null}
            {user && <Main userId={user.uid} />}
          </main>
        </div>
      </div>
      <MobileFooter />
    </div>
  )
}

const Main = ({ userId }) => {
  const [likedVideos, setLikedVideos] = useState(null);
  const [watchLaterVideos, setWatchLaterVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const likedVideosRef = firestore.collection("users").doc(userId).collection("likedVideos");
      const snapshot = await likedVideosRef.get();
      let videos = [];
      snapshot.docs.forEach(async doc => {
        const videoRef = firestore.collection("videos").doc(doc.id);
        const snapshot = await videoRef.get();
        const data = snapshot.data();
        videos.push(data);
      });
      setLikedVideos(videos);
    }

    fetchVideos();
  }, [userId])

  useEffect(() => {
    const fetchVideos = async () => {
      const watchLaterVideosRef = firestore.collection("users").doc(userId).collection("watchLater").orderBy("timeAdded", "desc");
      const snapshot = await watchLaterVideosRef.get();
      let videos = [];
      snapshot.docs.forEach(async doc => {
        const videoRef = firestore.collection("videos").doc(doc.id);
        const snapshot = await videoRef.get();
        const data = snapshot.data();
        videos.push(data);
      });
      setWatchLaterVideos(videos);
    }
    fetchVideos();
  }, [userId])

  if (!userId) return null;

  return (
    <div className="lg:mt-2 lg:-ml-1 w-full space-y-10">
      <section className="border-b-1 pb-2 border-lightGray dark:border-gray w-full">
        <div className="flex flex-row w-full justify-center lg:justify-between">
          <div className="flex flex-row w-full justify-center lg:justify-between sm:mb-10 mb-8">
            <div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl lg:text-2xl font-bold">&#128077; Liked Videos</div>
                <div className="text-base dark:text-lightGray mt-1">{likedVideos && likedVideos.length}</div>
              </div>
            </div>
            <div>
              <button className="hidden font-bold lg:block uppercase">see all</button>
            </div>
          </div>
        </div>
        {
          (likedVideos && likedVideos.length < 1) && <div className="text-center">No liked videos</div>
        }
        <div className="flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">

          {likedVideos && likedVideos.map((video: any, index: number) => (
            <Video key={index} video={video} />
          ))}
        </div>
        <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div>
      </section>

      <section className="border-b-1 pb-2 border-lightGray dark:border-gray w-full">
        <div className="flex flex-row w-full justify-center lg:justify-between">
          <div className="flex flex-row w-full justify-center lg:justify-between sm:mb-10 mb-8">
            <div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl lg:text-2xl font-bold">&#128337; Watch Later</div>
                <div className="text-base dark:text-lightGray mt-1">{watchLaterVideos && watchLaterVideos.length}</div>
              </div>
            </div>
            <div>
              <button className="hidden font-bold lg:block uppercase">see all</button>
            </div>
          </div>
        </div>
        {
          (watchLaterVideos && watchLaterVideos.length < 1) && <div className="text-center">No videos saved to watch later</div>
        }
        <div className="flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
          {watchLaterVideos && watchLaterVideos.map((video: any, index: number) => (
            <Video key={index} video={video} />
          ))}
        </div>
        <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div>
      </section>
    </div>
  )
}

//components
const Video = ({ video }) => {
  let time: string = "some time ago";

  if (video.timeUploaded) {
    time = formatTime(video.timeUploaded.seconds);
  }

  const formatTitle = (title: string) => {
    if (title.length >= 23) {
      return title.substring(0, 23) + "...";
    }

    return title;
  }

  return (
    <div className="w-10/12 m-auto sm:w-4/5 lg:w-auto  xl:w-64">
      <Link to={`/watch?v=${video.id}`}>
        <div className="poster text-right static">
          <img loading="lazy" src={video.posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </Link>
      <div className="ml-2 mr-2 mb-3">
        <h3 className="font-bold text-sm capitalize -mt-4">{formatTitle(video.title)}</h3>
        <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="text-sm font-bold hover:text-gray">{video.channelName}</Link></div>
        </div>
      </div>
    </div>
  )
}


export default Library;
