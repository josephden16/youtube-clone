import React, { useEffect, useState } from 'react';
import Video from '../../components/Video';
import Layout from '../../components/Layout';
import './trending.css';
import { firestore } from '../../firebase';

const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState(null);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const docRef = firestore.collection("videos").orderBy("timeUploaded", "desc");
        const snapshot = await docRef.get();
        const videos = snapshot.docs.map(doc => (
          {
            id: doc.id,
            ...doc.data()
          }
        ));
        setTrendingVideos(videos);
      } catch (error) {
        console.log(error);
        setTrendingVideos(null);
      }
    }
    fetchVideos();
  }, []);

  return (
    <Layout>
      <div className="lg:-ml-4 w-full block">
        <h1 className="text-center lg:text-left font-bold text-3xl mt-1 mb-8 lg:mb-12">Trending &#128293;</h1>
        {!trendingVideos && <div className="text-center">No videos.</div>}
        <section className="flex flex-wrap  space-y-12  sm:grid sm:space-y-0 sm:gap-5 sm:grid-cols-3  lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
          {trendingVideos && trendingVideos.map(video => (
            <Video key={video.id} video={video} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Trending;
