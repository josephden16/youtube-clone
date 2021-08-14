import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase';

export const VideosContext = createContext({ videos: null, loading: false });


const VideosProvider = (props: any) => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Start");
        const snapshot = await firestore.collection("videos").orderBy("timeUploaded", "desc").get();
        const videos = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setVideos(videos);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setVideos(null);
      }
    }
    fetchData();
  }, []);

  return (
    <VideosContext.Provider value={{ videos: videos, loading: loading }}>
      {props.children}
    </VideosContext.Provider>
  )
}

export default VideosProvider;
