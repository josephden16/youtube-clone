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
