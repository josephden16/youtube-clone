import { firestore } from "../../firebase";

export const getVideo = async ({ queryKey }) => {
  const [, { videoId }] = queryKey;

  try {
    const videoRef = firestore.collection("videos").doc(videoId);
    const videoSnapshot = await videoRef.get();
    const videoData = videoSnapshot.data();
    const channelRef = firestore
      .collection("channels")
      .doc(videoData.channelId);
    const channelSnapshot = await channelRef.get();
    const channelData = channelSnapshot.data();

    return {
      videoData,
      channelData,
    };
  } catch (error) {
    throw error;
  }
};

export const getRelatedVideos = async ({ queryKey }) => {
  const [, { currentVideoId }] = queryKey;

  try {
    const ref = await firestore
      .collection("videos")
      .where("id", "!=", currentVideoId)
      .limit(10)
      .get();

    const data = ref.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async ({ queryKey }) => {
  const [, { videoId }] = queryKey;

  try {
    let commentsRef = firestore
      .collection("comments")
      .doc(videoId)
      .collection("comments")
      .orderBy("likes", "desc")
      .limit(5);
    let snapshot = await commentsRef.get();
    let comments = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  
    return comments;
  } catch (err) {
    throw err;
  }
};
