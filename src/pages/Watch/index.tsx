import React, { useEffect, useState, useContext, useRef, Component } from 'react';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { firestore } from '../../firebase';
import Switch from '@bit/codyooo.rc-demo.switch';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { faHeart, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import MobileFooter from '../../components/MobileFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../components/providers/AuthProvider';
import { formatTime, getDiff, formatVideoTime } from '../../utils';
import { toast } from 'react-toastify';
import loadingImg from '../../images/loading.svg';
import './index.css';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Watch = () => {
  let query = useQuery();
  let v = query.get("v");
  const [navOpen, setNavOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [videoOptions, setVideoOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch data andsubscribe to changes in firestore
  useEffect(() => {
    let unsubscribeFromFirestore = firestore.collection('videos').doc(v).onSnapshot(snapshot => {
      const data: any = {
        id: snapshot.id,
        ...snapshot.data()
      };
      const videoJsOptions: any = {
        autoplay: true,
        controls: true,
        sources: [{
          src: data.videoURL,
          type: data.type
        }]
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
  }, [])


  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  return (
    <div className="watch dark:bg-dark pb-20 lg:pb-0 lg:mr-4 lg:ml-4">
      <div className="hidden text-center">Video id: {v}</div>
      <div className="lg:pl-2 lg:pr-2">
        <Header sidebar={true} handleMenu={handleSideBar} />
      </div>
      <div className="flex flex-row">
        <div className={navOpen ? 'transition-transform mr-16' : 'hideSidebar transition-transform'}>
          <SideBar />
        </div>
        <main className="layout mt-3 lg:mt-10 w-full">
          <VideoPlayer videoOptions={videoOptions} setChannelData={setChannelData} channelData={channelData} setVideoData={setVideoData} videoId={v} data={videoData} loading={loading} />
          <RelatedVideos videoId={v} />
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}

const Loading = ({ loading, msg }) => {
  return (
    <div className={loading ? 'mt-10 mb-14 flex flex-col items-center text-center' : 'hidden'}>
      <img src={loadingImg} className="w-14" alt="loading" />
      <div>{msg}</div>
    </div>
  )
}

const RelatedVideos = ({ videoId }) => {
  const [relatedVideos, seteRelatedVideos] = useState(null);
  const [checked, setCheck] = useState(false);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      const ref = await firestore
        .collection("videos")
        .where("id", "!=", videoId)
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
      <>
        {relatedVideos && relatedVideos.map((video: any) => {
          return <Video key={video.id} video={video} />
        })}
      </>
    </div>
  )
}


class Player extends Component {
  player: any;
  videoNode: any;
  props: any;

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
    this.player.fluid(true);
    // this.player.fill(true);
  }
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video poster={this.props.posterURL} onTimeUpdate={this.props.handlePlay} style={{ outline: 'none' }} className="vjs-matrix video-js transition-all duration-150" preload="none" ref={node => this.videoNode = node}></video>
        </div>
      </div>
    )
  }
}


const VideoPlayer = ({ data, channelData, loading, setVideoData, setChannelData, videoOptions, videoId }) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [viewed, setViewed] = useState(false);
  // const video = useRef(null);

  const openDescription = () => {
    setOpen(!open);
  }

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    //firestore references
    let unlikdedVideoDocumentRef = firestore.collection("users").doc(user.uid).collection("unlikedVideos").doc(data.id);
    let likedVideosCollectionRef = firestore.collection("users").doc(user.uid).collection("likedVideos");
    let likdedVideoDocumentRef = firestore.collection("users").doc(user.uid).collection("likedVideos").doc(data.id);
    let likes = data.likes;
    let unlikes = data.unlikes;

    let unlikeSnapshot = await unlikdedVideoDocumentRef.get();

    if (unlikeSnapshot.exists) {
      likedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      });
      await firestore.collection("videos").doc(videoId).set({ likes: likes + 1, unlikes: unlikes - 1 }, { merge: true });
      await unlikdedVideoDocumentRef.delete();
      setVideoData({
        likes: likes + 1,
        unlikes: unlikes - 1,
        ...data
      });
      toast.dark("Added to your liked videos");
      return;
    }

    let likeSnapshot = await likdedVideoDocumentRef.get();
    if (likeSnapshot.exists) {
      firestore.collection("videos").doc(videoId).set({ likes: likes - 1 }, { merge: true });
      setVideoData({
        likes: likes - 1,
        ...data
      });
      await likdedVideoDocumentRef.delete();
      toast.dark("Removed from your liked videos");
    } else {
      likedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      });
      setVideoData({
        likes: likes + 1,
        ...data
      });
      await firestore.collection("videos").doc(videoId).set({ likes: likes + 1 }, { merge: true });
      toast.dark("Added to your liked videos");
    }
  }

  const handleUnlike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    //firestore references
    let unlikedVideosCollectionRef = firestore.collection("users").doc(user.uid).collection("unlikedVideos");
    let unlikdedVideoDocumentRef = firestore.collection("users").doc(user.uid).collection("unlikedVideos").doc(data.id);
    let likdedVideoDocumentRef = firestore.collection("users").doc(user.uid).collection("likedVideos").doc(data.id);
    let likes = data.likes;
    let unlikes = data.unlikes;


    let likeSnapshot = await likdedVideoDocumentRef.get();
    if (likeSnapshot.exists) {
      unlikedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      })
      firestore.collection("videos").doc(videoId).set({ unlikes: unlikes + 1, likes: likes - 1 }, { merge: true });
      setVideoData({
        likes: likes - 1,
        unlikes: unlikes + 1,
        ...data
      });
      return;
    }

    let snapshot = await unlikdedVideoDocumentRef.get();
    if (snapshot.exists) {
      firestore.collection("videos").doc(videoId).set({ unlikes: unlikes - 1 }, { merge: true });
      setVideoData({
        unlikes: unlikes - 1,
        ...data
      });
      await unlikdedVideoDocumentRef.delete();
      toast.dark("Dislike removed");
    } else {
      unlikedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      });
      firestore.collection("videos").doc(videoId).set({ unlikes: unlikes + 1 }, { merge: true });
      setVideoData({
        unlikes: unlikes + 1,
        ...data
      });
      toast.dark("You disliked this video");
    }
  }

  const getIPAddress = async () => {
    let res = await fetch("https://api64.ipify.org?format=json");
    let ip = await res.json();
    return ip.ip;
  }

  const handlePlay = async (evt: any) => {
    if (viewed) return;
    let currentTime = evt.target.currentTime;
    if (currentTime > 1) {
      setViewed(true);
      let ipAddress: any = await getIPAddress();
      let ipRef = firestore.collection("videos").doc(videoId).collection("views").doc(ipAddress);
      let videoRef = firestore.collection("videos").doc(videoId);


      let snapshot = await ipRef.get();
      let viewsData = snapshot.data();

      if (!snapshot.exists) {
        await videoRef.set({ views: data.views + 1 }, { merge: true });
        await ipRef.set({
          ip: ipAddress,
          timeViewed: new Date()
        })
      } else {
        let timeViewed = viewsData.timeViewed.seconds;
        let diff = getDiff(timeViewed);
        if (diff >= 86400) {
          await videoRef.set({ views: data.views + 1 }, { merge: true });
          await ipRef.set({
            ip: ipAddress,
            timeViewed: new Date()
          })
        }
        return;
      }
    }
  }

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("You must be signed in to subscribe");
      return;
    }

    const channelId = channelData.id;
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
        setChannelData({
          ...data,
          subscribersCount: data.subscribersCount + 1
        })
        toast.success("You've subscribed to this channel");
      } catch (error) {
        toast.error("Failed to subscribe to channel");
      }
    } else {
      try {
        await channelRef.collection("subscriptions").doc(userId).delete();
        await channelRef.set({
          subscribersCount: data.subscribersCount - 1
        }, { merge: true });
        setChannelData({
          ...data,
          subscribersCount: data.subscribersCount - 1
        })
        toast.success("You've unsubscribed from this channel");
      } catch (error) {
        toast.error("Failed to unsubscribe from channel");
      }
    }
  }

  if (loading) return <Loading loading={loading} msg={"Fetching video data..."} />

  return (
    <div>
      <div className="videoPlayer">
        <Player poster={data.posterURL} type={data.type} src={data.videoURL} handlePlay={handlePlay} {...videoOptions} />
      </div>
      <div className="dark:border-gray flex flex-col ml-4 mr-4 mt-3 mb-4 lg:mt-6 border-lightGray border-b-1 space-y-3">
        <h1 className="capitalize font-bold text-xl lg:text-3xl">{data.title}</h1>
        <div className="lg:flex lg:flex-row lg:justify-between">
          <span className="dark:text-lightGray text-sm text-gray lg:mt-4">{data.views} views</span>
          <div className="dark:text-lightGray text-gray flex flex-row mt-2 pb-6 space-x-2">
            <button style={{ outline: 'none' }} onClick={handleLike} className="btn transition-colors shadow-md dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsUp} /> {data.likes}</button>
            <button style={{ outline: 'none' }} onClick={handleUnlike} className="btn transition-colors shadow-md dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsDown} /> {data.unlikes}</button>
            <button style={{ outline: 'none' }} className="btn transition-colors dark:bg-dark2 shadow-md bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faShare} /> Share</button>
          </div>
        </div>
      </div>
      <div className="transition-colors dark:border-gray ml-4 mr-4 mt-3 mb-9 pb-3 border-lightGray border-b-1">
        <div>
          <div className="flex flex-row justify-between mb-4">
            <div className="flex flex-row space-x-2" style={{ alignItems: 'center' }}>
              <img style={{ width: '60px' }} className="rounded-circle" src={channelData && channelData.channelPhotoURL} alt={'channel logo'} />
              <div>
                <a href={`/channel/${data.channelId}`} className="font-bold block hover:text-gray text-lg">{channelData && channelData.channelName}</a>
                <span className="dark:text-lightGray text-gray">{channelData && channelData.subscribersCount} subscribed</span>
              </div>
            </div>
            <button onClick={handleSubscribe} style={{ outline: 'none' }} className="btn dark:bg-dark text-red bg-white">Subscribe</button>
          </div>
        </div>
        <div className={open ? 'text-gray' : 'hideText mb-2'}>
          <p className="dark:text-lightGray lg:ml-16 text-sm mb-3">Published {formatTime(data.timeUploaded.seconds)}</p>
          {data.description && <p className="dark:text-lightGray lg:ml-16 text-sm">
            {data.description}
          </p>}
          {!data.description && <p className="dark:text-lightGray lg:ml-16 text-sm">
            This video does not have a description
          </p>}
        </div>
        <button onClick={openDescription} style={{ outline: 'none' }} className="dark:text-lightGray mt-2 uppercase text-gray text-sm font-bold">
          {open ? 'show less' : 'show more'}
        </button>
      </div>
      <Comments videoId={data.id} commentsCount={data.comments} />
    </div>
  )
}


const Comments = ({ videoId, commentsCount }) => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      let commentsRef = firestore.collection("comments").doc(videoId).collection("comments").orderBy("likes", "desc").limit(5);
      let snapshot = await commentsRef.get();
      let comments = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setComments(comments);
      setLoading(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) return <Loading loading={loading} msg="Fetching comments..." />;


  return (
    <div className="mt-5 mb-10 lg:ml-3 lg:mr-3">
      <div className="ml-4 lg:ml-1">
        <span className="font-bold">Comments {commentsCount}</span>
      </div>
      {user && <AddComment videoId={videoId} fetchComments={fetchData} commentsCount={commentsCount} user={user} />}
      <div className="space-y-8 ml-2 lg:ml-0">
        {comments && comments.map(comment => <Comment key={comment.id} user={user} videoId={videoId} comment={comment} />)}
      </div>
    </div>
  )
}

const AddComment = ({ user, videoId, commentsCount, fetchComments }) => {
  const [comment, setComment] = useState("");
  const inputField = useRef(null);
  const postComment = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action.");
      return;
    }

    if (comment === "") {
      toast.error("Comment field cannot be empty");
      return;
    }

    try {
      await firestore.collection("comments").doc(videoId).collection("comments").add({
        message: comment,
        timePosted: new Date(),
        userId: user.uid,
        userPhotoURL: user.photoURL,
        userName: user.displayName,
        likes: 0
      })

      await firestore.collection("videos").doc(videoId).set({
        comments: commentsCount + 1
      }, { merge: true });

      toast.dark("Added comment");

      await fetchComments();

    } catch (error) {
      toast.error("An error occured");
    }

    setComment("");
    inputField.current.value = "";
  }

  return (
    <div className="space-y-3 mt-4 ml-2 mr-2 mb-6">
      <div className="flex space-x-4 lg:space-x-6 justify-items-start">
        <img src={user.photoURL} className="rounded-circle w-8 lg:w-10" alt={user.displayName} />
        <input ref={inputField} onChange={(evt) => setComment(evt.target.value)} type="text" placeholder="Add a comment" className="dark:bg-dark dark:border-gray text-sm w-full border-b-1 border-lightGray outline-none" />
      </div>
      <div className="flex justify-end">
        <button style={{ outline: 'none' }} onClick={postComment} className="dark:bg-dark2 dark:text-lightGray hover:opacity-70 transition-colors text-xs lg:text-sm bg-lightGray font-bold pl-3 pr-3 pt-2 pb-2 text-gray uppercase">Comment</button>
      </div>
    </div>
  )
}


const Comment = ({ user, comment, videoId }) => {
  let [likes, setLikes] = useState(comment.likes);
  let time: string = "some time ago";

  if (comment.timePosted) {
    let unixTime = comment.timePosted.seconds;
    time = formatTime(unixTime);
  }
  const handleLike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }
    let commentRef = firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id);
    let likedRef = firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid);
    let likedSnapshot = await likedRef.get();

    if (!likedSnapshot.exists) {
      try {
        await firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid).set({
          user: user.displayName
        });
        commentRef.set({
          likes: likes + 1
        }, { merge: true });
        setLikes(likes + 1);
        toast.dark("Liked comment");
      } catch (error) {
        toast.error("An error occured");
      }
      return;
    } else {
      await commentRef.set({
        likes: likes - 1
      }, { merge: true });
      setLikes(likes - 1);
      await firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid).delete();
    }
  }

  return (
    <div className="flex flex-col space-y-1 gap-2 mt-4 lg:mt-10 ml-2 mr-2">
      <div>
        <img className="rounded-circle w-8 lg:w-10" src={comment.userPhotoURL} alt={comment.userName} />
      </div>
      <div className="flex flex-col space-y-2 flex-wrap">
        <div className="text-xs lg:text-sm space-x-2">
          <span className="font-bold">{comment.userName}</span>
          <span className="text-gray dark:text-lightGray">{time}</span>
        </div>
        <div className="text-sm lg:text-base">
          <span>{comment.message}</span>
        </div>
        <div className="dark:text-lightGray text-gray flex items-center space-x-2">
          <button style={{ outline: 'none' }} onClick={handleLike} className="hover:opacity-70 text-gray dark:text-lightGray">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span className="text-sm">{likes}</span>
        </div>
      </div>
    </div>
  )
}


const Video = ({ video }) => {
  let time: string = "some time ago";

  if (!video) return null;

  return (
    <div className="video">
      <a href={`/watch?v=${video.id}`}>
        <div className="text-right static">
          <img src={video.posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="text-xs relative right-3 bottom-8 bg-gray  opacity-80 text-white pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </a>
      <div className="transition-colors ml-2 mr-2">
        <h3 className="font-bold capitalize text-sm -mt-4">{video.title}</h3>
        <div className="dark:text-lightGray text-gray text-xs flex justify-between">
          <div className="space-x-2">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{video.timeUploaded ? formatTime(video.timeUploaded.seconds) : time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="font-bold hover:text-gray">Joseph</Link></div>
        </div>
      </div>
    </div>
  )
};

export default Watch;
//TODO: Add Comments and ability to delete them
//TODO: Add subscribe feature
