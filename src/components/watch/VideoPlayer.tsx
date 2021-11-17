import {
  faClock,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { formatTime, getDiff } from "../../utils";
import { UserContext } from "../providers/AuthProvider";
import Comments from "./Comments";
import Player from "./Player";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firestore } from "../../firebase";
import { useQueryClient } from "react-query";
import VideoPlayerSkeleton from "./VideoPlayerSkeleton";

export default function VideoPlayer({
  data,
  channelData,
  nextVideoId,
  autoplay,
  loading,
  videoId,
  queryKey,
}) {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [viewed, setViewed] = useState(false);
  const queryClient = useQueryClient();

  const videoJsOptions: any = {
    autoplay: false,
    controls: true,
    sources: [
      {
        src: data?.videoURL,
        type: data?.type,
      },
    ],
    aspectRatio: "16:9",
    fill: true,
  };

  const toggleDescription = () => {
    setOpen(!open);
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    //firestore references
    let unlikdedVideoDocumentRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("unlikedVideos")
      .doc(data.id);
    let likedVideosCollectionRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("likedVideos");
    let likdedVideoDocumentRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("likedVideos")
      .doc(data.id);
    let likes = data.likes;
    let unlikes = data.unlikes;

    let unlikeSnapshot = await unlikdedVideoDocumentRef.get();

    if (unlikeSnapshot.exists) {
      likedVideosCollectionRef.doc(data.id).set({
        video: firestore.collection("videos").doc(data.id),
        timeAdded: new Date(),
      });
      try {
        await firestore
          .collection("videos")
          .doc(videoId)
          .set({ likes: likes + 1, unlikes: unlikes - 1 }, { merge: true });
        await unlikdedVideoDocumentRef.delete();
        queryClient.invalidateQueries(queryKey); // reset the cache
        toast.success("Added to your liked videos");
        return;
      } catch (error) {
        console.log(error);
      }
    }

    let likeSnapshot = await likdedVideoDocumentRef.get();
    if (likeSnapshot.exists) {
      try {
        firestore
          .collection("videos")
          .doc(videoId)
          .set({ likes: likes - 1 }, { merge: true });
        queryClient.invalidateQueries(queryKey); // reset the cache
        await likdedVideoDocumentRef.delete();
        toast.success("Removed from your liked videos");
      } catch (error) {
        toast.error("Operation failed.");
      }
    } else {
      try {
        likedVideosCollectionRef.doc(data.id).set({
          video: firestore.collection("videos").doc(data.id),
          timeAdded: new Date(),
        });
        queryClient.invalidateQueries(queryKey); // reset the cache
        await firestore
          .collection("videos")
          .doc(videoId)
          .set({ likes: likes + 1 }, { merge: true });
        toast.dark("Added to your liked videos");
      } catch (error) {
        toast.error("Operation failed.");
      }
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    //firestore references
    let unlikedVideosCollectionRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("unlikedVideos");
    let unlikdedVideoDocumentRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("unlikedVideos")
      .doc(data.id);
    let likdedVideoDocumentRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("likedVideos")
      .doc(data.id);
    let likes = data.likes;
    let unlikes = data.unlikes;

    let likeSnapshot = await likdedVideoDocumentRef.get();
    if (likeSnapshot.exists) {
      try {
        unlikedVideosCollectionRef.doc(data.id).set({
          video: firestore.collection("videos").doc(data.id),
          timeAdded: new Date(),
        });
        firestore
          .collection("videos")
          .doc(videoId)
          .set({ unlikes: unlikes + 1, likes: likes - 1 }, { merge: true });
        queryClient.invalidateQueries(queryKey); // reset the cache
        return;
      } catch (error) {
        toast.error("Operation failed.");
      }
    }

    let snapshot = await unlikdedVideoDocumentRef.get();
    if (snapshot.exists) {
      try {
        firestore
          .collection("videos")
          .doc(videoId)
          .set({ unlikes: unlikes - 1 }, { merge: true });
        queryClient.invalidateQueries(queryKey); // reset the cache
        await unlikdedVideoDocumentRef.delete();
        toast.success("Dislike removed");
      } catch (error) {
        toast.error("Operation failed");
      }
    } else {
      try {
        unlikedVideosCollectionRef.doc(data.id).set({
          video: firestore.collection("videos").doc(data.id),
          timeAdded: new Date(),
        });
        firestore
          .collection("videos")
          .doc(videoId)
          .set({ unlikes: unlikes + 1 }, { merge: true });
        queryClient.invalidateQueries(queryKey); // reset the cache
        toast.success("You disliked this video");
      } catch (error) {
        toast.error("Operation failed");
      }
    }
  };

  const getIPAddress = async () => {
    try {
      let res = await fetch("https://api64.ipify.org?format=json");
      let ip = await res.json();
      return ip.ip;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = async (evt: any) => {
    if (evt.target.currentTime >= data.duration && autoplay) {
      window.location.href = `/watch?v=${nextVideoId}`;
      return;
    }

    if (viewed) return;
    let currentTime = evt.target.currentTime;
    if (currentTime > 1) {
      setViewed(true);
      let ipAddress: any = await getIPAddress();
      let ipRef = firestore
        .collection("videos")
        .doc(videoId)
        .collection("views")
        .doc(ipAddress);
      let videoRef = firestore.collection("videos").doc(videoId);

      try {
        let snapshot = await ipRef.get();
        let viewsData = snapshot.data();

        if (!snapshot.exists) {
          await videoRef.set({ views: data.views + 1 }, { merge: true });
          await ipRef.set({
            ip: ipAddress,
            timeViewed: new Date(),
          });
        } else {
          let timeViewed = viewsData.timeViewed.seconds;
          let diff = getDiff(timeViewed);
          if (diff >= 86400) {
            await videoRef.set({ views: data.views + 1 }, { merge: true });
            await ipRef.set({
              ip: ipAddress,
              timeViewed: new Date(),
            });
          }
          return;
        }
      } catch (error) {}
    }
  };

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

    if (!snapshot.exists) {
      try {
        await userRef.collection("subscriptions").doc(channelId).set(
          {
            channelId: channelId,
            channelPhotoURL: channelData.channelPhotoURL,
            channelDisplayName: channelData.channelName,
          },
          { merge: true }
        );
        await subscriberRef.set(
          {
            userId: userId,
            userDisplayName: user.displayName,
          },
          { merge: true }
        );
        await channelRef.set(
          {
            subscribersCount: channelData.subscribersCount + 1,
          },
          { merge: true }
        );
        queryClient.invalidateQueries(queryKey); // reset the cache
        toast.success("You've subscribed to this channel");
      } catch (error) {
        console.log(error);
        toast.error("Failed to subscribe to channel");
      }
    } else {
      try {
        await subscriberRef.delete();
        await userRef.collection("subscriptions").doc(channelId).delete();
        await channelRef.set(
          {
            subscribersCount: channelData.subscribersCount - 1,
          },
          { merge: true }
        );
        queryClient.invalidateQueries(queryKey); // reset the cache
        toast.success("You've unsubscribed from this channel");
      } catch (error) {
        console.log(error);
        toast.error("Failed to unsubscribe from channel");
      }
    }
  };

  const saveToWatchLater = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }

    const watchLaterRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("watchLater");
    const videoRef = watchLaterRef.doc(data.id);

    const snapshot = await videoRef.get();

    if (!snapshot.exists) {
      try {
        await videoRef.set({
          timeAdded: new Date(),
        });
      } catch (error) {
        toast.error("Operation failed");
      }
      toast.success("Saved to watch later.");
    } else {
      videoRef.delete();
      toast.success("Removed from watch later.");
    }
  };

  // if (loading)
  //   return <Loading loading={loading} msg={"Fetching video data..."} />;

  if (loading) return <VideoPlayerSkeleton /> 

  return (
    <div>
      <div className="videoPlayer">
        <Player
          poster={data.posterURL}
          type={data.type}
          src={data.videoURL}
          handlePlay={handlePlay}
          {...videoJsOptions}
        />
      </div>
      <div className="dark:border-gray flex flex-col ml-4 mr-4 mt-3 mb-4 lg:mt-6 border-lightGray border-b-1 space-y-3">
        <h1 className="capitalize font-bold text-xl lg:text-3xl">
          {data.title}
        </h1>
        <div className="lg:flex lg:flex-row lg:justify-between">
          <span className="dark:text-lightGray text-sm text-gray lg:mt-4">
            {data.views} views
          </span>
          <div className="dark:text-lightGray text-gray flex flex-row mt-2 pb-6 space-x-2">
            <button
              style={{ outline: "none" }}
              onClick={handleLike}
              className="btn transition-colors shadow-md dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"
            >
              <FontAwesomeIcon icon={faThumbsUp} /> {data.likes}
            </button>
            <button
              style={{ outline: "none" }}
              onClick={handleUnlike}
              className="btn transition-colors shadow-md dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"
            >
              <FontAwesomeIcon icon={faThumbsDown} /> {data.unlikes}
            </button>
            <button
              style={{ outline: "none" }}
              onClick={saveToWatchLater}
              className="flex items-center space-x-3 btn transition-colors shadow-md dark:bg-dark2 bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"
            >
              <FontAwesomeIcon icon={faClock} />
              <span className="text-xs lg:text-sm capitalize">watch later</span>
            </button>
          </div>
        </div>
      </div>
      <div className="transition-colors dark:border-gray ml-4 mr-4 mt-3 mb-9 pb-3 border-lightGray border-b-1">
        <div>
          <div className="flex flex-row justify-between mb-4">
            <div
              className="flex flex-row space-x-3"
              style={{ alignItems: "center" }}
            >
              <Link to={channelData && `/channel/${channelData.id}`}>
                <img
                  style={{ width: "60px" }}
                  className="rounded-circle"
                  src={channelData && channelData.channelPhotoURL}
                  alt={"channel logo"}
                />
              </Link>
              <div>
                <a
                  href={`/channel/${data.channelId}`}
                  className="font-bold block hover:text-gray text-lg"
                >
                  {channelData && channelData.channelName}
                </a>
                <span className="dark:text-lightGray text-gray">
                  {channelData && channelData.subscribersCount} subscribed
                </span>
              </div>
            </div>
            <button
              onClick={handleSubscribe}
              style={{ outline: "none" }}
              className="btn dark:bg-dark text-red font-bold bg-white uppercase"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className={open ? "text-gray" : "hideText mb-2"}>
          <p className="dark:text-lightGray lg:ml-16 text-sm mb-3">
            Published {formatTime(data.timeUploaded.seconds)}
          </p>
          {data.description && (
            <p className="dark:text-lightGray lg:ml-16 text-sm">
              {data.description}
            </p>
          )}
          {!data.description && (
            <p className="dark:text-lightGray lg:ml-16 text-sm">
              This video does not have a description
            </p>
          )}
        </div>
        <button
          onClick={toggleDescription}
          style={{ outline: "none" }}
          className="dark:text-lightGray mt-2 uppercase text-gray text-sm font-bold"
        >
          {open ? "show less" : "show more"}
        </button>
      </div>
      <Comments videoId={data.id} commentsCount={data.comments} />
    </div>
  );
}
