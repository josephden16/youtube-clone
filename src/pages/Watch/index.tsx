import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { firestore } from '../../firebase';
import Switch from '@bit/codyooo.rc-demo.switch';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import channelLogo from '../../images/channel-logo.png';
import videoCover from '../../images/Cover.jpg';
import MobileFooter from '../../components/MobileFooter';
// import poster from '../../images/poster.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../components/providers/AuthProvider';
import { toast } from 'react-toastify';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Watch = () => {
  let query = useQuery();
  let v = query.get("v");
  const [navOpen, setNavOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch data on initial page load
  useEffect(() => {
    const fetchData = async () => {
      const videoSnapshot = await firestore.collection('videos').doc(v).get();
      const data = videoSnapshot.data();
      setVideoData(data);
      setLoading(false);
    }
    fetchData();
  }, [v]);

  //subscribe to changes in firestore
  useEffect(() => {
    let unsubscribeFromFirestore = firestore.collection('videos').doc(v).onSnapshot(snapshot => {
      const data = snapshot.data();
      setVideoData(data);
    });

    return () => {
      unsubscribeFromFirestore();
    }
  })


  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className="lg:mr-4 lg:ml-4">
      <div className="hidden text-center">Video id: {v}</div>
      <div className="lg:pl-2 lg:pr-2">
        <Header handleMenu={handleSideBar} />
      </div>
      <div className="flex flex-row">
        <div className={navOpen ? 'transition-transform mr-16' : 'hideSidebar transition-transform'}>
          <SideBar />
        </div>
        <main className="layout mt-3 lg:mt-10 w-full">
          <VideoPlayer videoId={v} data={videoData} loading={loading} />
          <RelatedVideos />
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}

const RelatedVideos = () => {
  const [checked, setCheck] = useState(false);
  const handleSwitch = () => {
    setCheck(!checked);
  }

  return (
    <div className="space-y-6">
      <div style={{ alignItems: 'center' }} className="video flex flex-row justify-between">
        <h3 className="text-2xl font-bold">Next</h3>
        <div className="mr-2">
          <span className="uppercase font-bold text-xs">Autoplay</span>
          <Switch checked={checked} onClick={handleSwitch} className="ml-2" />
        </div>
      </div>
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  )
}

const VideoPlayer = ({ data, loading, videoId }) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const video = useRef(null);
  
  useEffect(() => {
    console.log(video);
  }, []);

  const openDescription = () => {
    setOpen(!open);
  }

  const handleLike = () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }
    let likes = data.likes + 1;
    firestore.collection("videos").doc(videoId).set({ ...data, likes });
  }

  const handleUnlike = () => {
    if (!user) {
      toast.error("You must be signed in to perfrom this action");
      return;
    }
    let dislikes = data.dislikes + 1;
    firestore.collection("videos").doc(videoId).set({ ...data, dislikes });
  }

  if (loading) return <div className="text-center mb-4">Loading...</div>;

  return (
    <div>
      <video ref={video} style={{ outline: 'none' }} className="videoPlayer transition-all duration-150" preload="none" controls poster={data.posterURL}>
        <source src={data.videoURL} type='video/mp4' />
      </video>
      <div className="dark:border-gray flex flex-col ml-4 mr-4 mt-3 mb-4 lg:mt-6 border-lightGray border-b-1 space-y-3">
        <h1 className="capitalize font-bold text-xl lg:text-3xl">{data.title}</h1>
        <div className="lg:flex lg:flex-row lg:justify-between">
          <span className="dark:text-lightGray text-sm text-gray lg:mt-4">{data.views} views</span>
          <div className="dark:text-lightGray text-gray flex flex-row mt-2 pb-6 space-x-2">
            <button onClick={handleLike} className="transition-colors dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsUp} /> {data.likes}</button>
            <button onClick={handleUnlike} className="transition-colors dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsDown} /> {data.dislikes}</button>
            <button className="transition-colors dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
        </div>
      </div>
      <div className="transition-colors dark:border-gray ml-4 mr-4 mt-3 mb-9 pb-3 border-lightGray border-b-1">
        <div>
          <div className="flex flex-row justify-between mb-2">
            <div className="flex flex-row space-x-2" style={{ alignItems: 'center' }}>
              <img style={{ width: '60px' }} src={channelLogo} alt={'channel logo'} />
              <div>
                <h3 className="font-bold text-lg">Entertainment</h3>
                <span className="dark:text-lightGray text-gray">245k subscribed</span>
              </div>
            </div>
            <button style={{ outline: 'none' }} className="dark:bg-dark text-red bg-white">Subscribe</button>
          </div>
        </div>
        <div className={open ? 'text-gray' : 'hideText'}>
          <p className="dark:text-lightGray lg:ml-16">
            A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the consumer’s mood when they see your ad.
      </p>
        </div>
        <button onClick={openDescription} style={{ outline: 'none' }} className="dark:text-lightGray mt-2 uppercase text-gray font-bold">
          {open ? 'show less' : 'show more'}
        </button>
      </div>
    </div>
  )
}


const Video = () => (
  <div className="video">
    <Link to="/watch?v=122">
      <div className="text-right static">
        <img src={videoCover} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
        <span className="relative right-3 bottom-8 bg-gray opacity-80 text-white pl-2 pr-2 rounded-xl">4:15</span>
      </div>
    </Link>
    <div className="transition-colors ml-2 mr-2">
      <h3 className="font-bold capitalize -mt-4">A brief history of Creation</h3>
      <div className="dark:text-lightGray text-gray text-xs flex justify-between">
        <div className="space-x-2">
          <span>80k views</span>
          <span>&middot;</span>
          <span>3 days ago</span>
        </div>
        <div><span>Dollie Blair</span></div>
      </div>
    </div>
  </div>
);

export default Watch;
//TODO: Add Comments
//TODO: Add Views feature
//TODO: Add
// https://firebasestorage.googleapis.com/v0/b/clone-dbe6b.appspot.com/o/posters%2Fposter.png?alt=media&token=29abc305-9e92-4f54-8f2a-4792a6750b72
// https://firebasestorage.googleapis.com/v0/b/clone-dbe6b.appspot.com/o/posters%2FCover.jpg?alt=media&token=969d6487-2ac2-453b-b712-37bb4516feaf 