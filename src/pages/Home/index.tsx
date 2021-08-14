import { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import Layout from '../../components/common/Layout';
import Videos from '../../components/home/Videos';
import './home.css';


const Home = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const snapshot = await firestore.collection("videos").orderBy("timeUploaded", "desc").get();
        const videos = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        if (videos && videos.length > 0) {
          setVideos(videos);
          setLoading(false);
          setError("");
        } else {
          setVideos(null);
          setError("Failed to fetch videos");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch videos");
      }
    }
    fetchData();
  }, []);


  return (
    <Layout>
      <div className="lg:mt-8 lg:-ml-4 xl:-ml-5 w-full block space-y-16">
        <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full">
          <Videos videos={videos} loading={loading} error={error} />
        </section>
      </div>
    </Layout>
  )
}

export default Home;
