import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { firestore } from '../../firebase';
import Switch from '@bit/codyooo.rc-demo.switch';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { faHeart, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import channelLogo from '../../images/channel-logo.png';
import videoCover from '../../images/Cover.jpg';
import MobileFooter from '../../components/MobileFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../components/providers/AuthProvider';
import { toast } from 'react-toastify';
import loadingImg from '../../images/loading.svg';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Watch = () => {
  let query = useQuery();
  let v = query.get("v");
  const [navOpen, setNavOpen] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);


  //fetch data andsubscribe to changes in firestore
  useEffect(() => {
    let unsubscribeFromFirestore = firestore.collection('videos').doc(v).onSnapshot(snapshot => {
      const data = {
        id: snapshot.id,
        ...snapshot.data()
      };
      setVideoData(data);
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
    <div className="dark:bg-dark pb-20 lg:pb-0 lg:mr-4 lg:ml-4">
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

const Loading = ({ loading, msg }) => {
  return (
    <div className={loading ? 'mt-10 mb-14 flex flex-col items-center text-center' : 'hidden'}>
      <img src={loadingImg} className="w-14" alt="loading" />
      <div>{msg}</div>
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
      firestore.collection("videos").doc(videoId).set({ likes: likes + 1, unlikes: unlikes - 1 }, { merge: true });
      await unlikdedVideoDocumentRef.delete();
      toast.dark("Added to your liked videos");
      return;
    }

    let likeSnapshot = await likdedVideoDocumentRef.get();
    if (likeSnapshot.exists) {
      firestore.collection("videos").doc(videoId).set({ likes: likes - 1 }, { merge: true });
      await likdedVideoDocumentRef.delete();
      toast.dark("Removed from your liked videos");
    } else {
      likedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      });
      firestore.collection("videos").doc(videoId).set({ likes: likes + 1 }, { merge: true });
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
    }

    let snapshot = await unlikdedVideoDocumentRef.get();
    if (snapshot.exists) {
      firestore.collection("videos").doc(videoId).set({ unlikes: unlikes - 1 }, { merge: true });
      await unlikdedVideoDocumentRef.delete();
      toast.dark("Removed from your unliked videos");
    } else {
      unlikedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date()
      });
      firestore.collection("videos").doc(videoId).set({ unlikes: unlikes + 1 }, { merge: true });
      toast.dark("Added to Unliked videos");
    }
  }

  if (loading) return <Loading loading={loading} msg={"Fetching video data..."} />

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
            <button onClick={handleUnlike} className="transition-colors dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsDown} /> {data.unlikes}</button>
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
      let commentsRef = firestore.collection("comments").doc(videoId).collection("comments").limit(5).orderBy("likes", "desc");
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
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) return <Loading loading={loading} msg="Fetching comments..." />;


  return (
    <div className="mt-5 mb-10 lg:ml-3 lg:mr-3">
      <div className="ml-2 lg:ml-0">
        <span className="font-bold">{commentsCount === 1 ? `${commentsCount} Comment` : `${commentsCount} Comments`}</span>
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
        <button onClick={postComment} className="dark:bg-dark2 dark:text-lightGray hover:opacity-70 transition-colors text-xs lg:text-sm bg-lightGray font-bold pl-3 pr-3 pt-2 pb-2 text-gray uppercase">Comment</button>
      </div>
    </div>
  )
}


const Comment = ({ user, comment, videoId }) => {
  let [likes, setLikes] = useState(comment.likes);
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
      console.log(likes);
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
          <span className="text-gray dark:text-lightGray">3 months ago</span>
        </div>
        <div className="text-sm lg:text-base">
          <span>{comment.message}</span>
        </div>
        <div className="dark:text-lightGray text-gray flex items-center space-x-2">
          <button onClick={handleLike} className="hover:opacity-70 text-gray dark:text-lightGray">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span className="text-sm">{likes}</span>
        </div>
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
//TODO: Add Comments and ability to delete them
//TODO: Add Views feature
//TODO: Add subscribe feature
