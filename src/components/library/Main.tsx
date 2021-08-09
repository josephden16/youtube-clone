import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import LikedVideos from "./LikedVideos";
import WatchLaterVideos from "./WatchLaterVideos";


export default function Main({ userId }) {
  const [likedVideos, setLikedVideos] = useState(null);
  const [watchLaterVideos, setWatchLaterVideos] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const likedVideosRef = firestore.collection("users").doc(userId).collection("likedVideos");
      const snapshot = await likedVideosRef.get();
      let videos = [];
      let size = snapshot.docs.length;
      snapshot.docs.forEach(async (doc, index) => {
        const videoRef = firestore.collection("videos").doc(doc.id);
        const snapshot = await videoRef.get();
        const data = snapshot.data();
        videos.push(data);
        if (index === size - 1) {
          setLikedVideos(videos);
        }
      });
    }

    fetchVideos();
  }, [userId])

  useEffect(() => {
    const fetchVideos = async () => {
      const watchLaterVideosRef = firestore.collection("users").doc(userId).collection("watchLater").orderBy("timeAdded", "desc");
      const snapshot = await watchLaterVideosRef.get();
      let videos = [];
      let size = snapshot.docs.length;
      snapshot.docs.forEach(async (doc, index) => {
        const videoRef = firestore.collection("videos").doc(doc.id);
        const snapshot = await videoRef.get();
        const data = snapshot.data();
        videos.push(data);
        if (index === size - 1) {
          setWatchLaterVideos(videos);
        }
      });
    }
    fetchVideos();
  }, [userId])

  if (!userId) return null;

  return (
    <div className="lg:mt-2 lg:-ml-4 w-full space-y-10">
      <LikedVideos likedVideos={likedVideos} />
      <WatchLaterVideos watchLaterVideos={watchLaterVideos} />
      {!watchLaterVideos && <div className="text-center mt-7">No videos saved to watch later</div>}
      {!likedVideos && <div className="text-center mt-7">No liked videos</div>}
    </div>
  )
}
