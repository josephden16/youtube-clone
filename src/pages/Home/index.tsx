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
        const snapshot = await firestore.collection("videos").orderBy("timeUploaded", "desc").limit(12).get();
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
        <Videos videos={videos} loading={loading} error={error} />
      </div>
    </Layout>
  )
}

export default Home;
