import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import MobileFooter from '../../components/navigation/MobileFooter';
import { firestore } from '../../firebase';
import VideoPlayer from '../../components/watch/VideoPlayer';
import RelatedVideos from '../../components/watch/RelatedVideos';
import './watch.css';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Watch = () => {

  let query = useQuery();
  let videoId = query.get("v");
  const [navOpen, setNavOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [videoOptions, setVideoOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checked, setCheck] = useState(false);
  const [relatedVideos, seteRelatedVideos] = useState(null);



  //fetch data andsubscribe to changes in firestore
  useEffect(() => {
    let unsubscribeFromFirestore = firestore.collection('videos').doc(videoId).onSnapshot(snapshot => {
      const data: any = {
        id: snapshot.id,
        ...snapshot.data()
      };
      const videoJsOptions: any = {
        autoplay: false,
        controls: true,
        sources: [{
          src: data.videoURL,
          type: data.type
        }],
        aspectRatio: '16:9',
        fill: true,
      }

      const channelRef = firestore.collection("channels").doc(data.channelId);
      channelRef.get().then((snapshot) => {
        let data = snapshot.data();
        setChannelData({
          id: snapshot.id,
          ...data
        })
      });

      setVideoData(data);
      setVideoOptions(videoJsOptions);
      setLoading(false);
    });

    return () => {
      unsubscribeFromFirestore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);


  useEffect(() => {
    const fetchRelatedVideos = async () => {
      const ref = await firestore
        .collection("videos")
        .where("id", "!=", videoId)
        .limit(10)
        .get();
      const data = ref.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      seteRelatedVideos(data);
    }
    fetchRelatedVideos();
  }, [videoId]);

  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  const handleSwitch = () => {
    setCheck(!checked);
  }

  return (
    <div className="watch dark:bg-dark pb-20 lg:pb-0 lg:mr-4 lg:ml-4 lg:mb-10">
      <div>
        <Header sidebar={true} handleMenu={handleSideBar} />
      </div>
      <div className="block lg:flex lg:flex-row">
        <div className={navOpen ? 'transition-transform mr-16 xl:w-56' : 'hideSidebar transition-transform'}>
          <SideBar />
        </div>
        <main className="layout mt-3 lg:-ml-1 lg:mt-10 w-full lg:space-x-10">
          <VideoPlayer autoplay={checked} nextVideoId={relatedVideos ? relatedVideos[0].id : ''} videoOptions={videoOptions} setChannelData={setChannelData} channelData={channelData} setVideoData={setVideoData} videoId={videoId} data={videoData} loading={loading} />
          <RelatedVideos relatedVideos={relatedVideos} checked={checked} handleSwitch={handleSwitch} />
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}

export default Watch;
//TODO: Add  ability to delete comments
