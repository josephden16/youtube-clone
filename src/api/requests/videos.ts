import { firestore } from "../../firebase";

export const getHomePageVideos = async () => {
  try {
    const snapshot = await firestore
      .collection("videos")
      .orderBy("timeUploaded", "desc")
      .limit(12)
      .get();

    const videos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return videos;
  } catch (error) {
    throw error;
  }
};

export const searchVideos = async (searchQuery: string) => {
  try {
    const snapshot = await firestore.collection("videos").get();

    const videos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    console.log(videos);

    if (videos && videos.length > 0) {
      const filteredVideos = videos.filter(
        (video: any) =>
          video.title.toLowerCase().indexOf(searchQuery) > -1 ||
          video.description.toLowerCase().indexOf(searchQuery) > -1 ||
          video.channelName.toLowerCase().indexOf(searchQuery) > -1
      );

      console.log(filteredVideos);
      return filteredVideos;
    }
    return [];
  } catch (error) {
    throw error;
  }
};
