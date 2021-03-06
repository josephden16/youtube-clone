import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../../firebase';

export const VideosContext = createContext([]);


const VideosProvider = (props: any) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection("videos").orderBy("timeUploaded", "desc").get();
      const videos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setVideos(videos);
    }
    fetchData()
  }, [])

  return (
    <VideosContext.Provider value={videos}>
      {props.children}
    </VideosContext.Provider>
  )
}

export default VideosProvider;
