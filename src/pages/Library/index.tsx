import React, { useContext, useEffect, useState } from 'react';
import Authentication from '../../components/Authentication';
import Layout from '../../components/Layout';
import { UserContext } from '../../components/providers/AuthProvider';
import Video from '../../components/Video';
import { firestore } from '../../firebase';


const Library = () => {
  const user = useContext(UserContext);
  return (
    <Layout>
      {!user &&
        <div className="text-center mt-8 space-y-3">
          <div>You must be signed in to access your library.</div>
          <Authentication />
        </div>
      }
      {user && <Main userId={user.uid} />}
    </Layout>
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
    </div>
  )
}

const WatchLaterVideos = ({ watchLaterVideos }) => {
  if (!watchLaterVideos) return null;
  return (
    <section className="border-b-1 pb-2 border-lightGray dark:border-gray w-full">
      <div className="flex flex-row w-full justify-center lg:justify-between">
        <div className="flex flex-row w-full justify-center mb-8 sm:mb-10 lg:justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl lg:text-2xl font-bold">&#128337; Watch Later</div>
              <div className="text-base dark:text-lightGray mt-1">{watchLaterVideos && watchLaterVideos.length}</div>
            </div>
          </div>
          <div>
            {/* <button className="hidden font-bold lg:block uppercase">see all</button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
        {watchLaterVideos && watchLaterVideos.map((video: any, index: number) => (
          <Video key={index} video={video} />
        ))}
      </div>
      {/* <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div> */}
    </section>
  )
}

const LikedVideos = ({ likedVideos }) => {
  if (!likedVideos) return null;
  return (
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
            {/* <button className="hidden font-bold lg:block uppercase">see all</button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
        {likedVideos && likedVideos.map((video: any, index: number) => (
          <Video key={index} video={video} />
        ))}
      </div>
      {/* <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div> */}
    </section>
  )
}

export default Library;
