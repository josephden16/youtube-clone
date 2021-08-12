import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import Video from "../common/Video";
import Loading from "./Loading";


export default function Videos({ user }) {
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
