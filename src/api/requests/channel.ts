import { firestore } from "../../firebase";

export const getChannelData = async ({ queryKey }) => {
  const [, { channelId }] = queryKey;

  const channelRef = firestore.collection("channels").doc(channelId);
  let snapshot = await channelRef.get();
  if (snapshot.exists) {
    let data = { id: snapshot.id, ...snapshot.data() };
    return data;
  }
  return null;
};

export const getChannelVideos = async ({ queryKey }) => {
  const [, { channelId }] = queryKey;

  const ref = firestore
    .collection("videos")
    .where("channelId", "==", channelId)
    .orderBy("timeUploaded", "desc");
  const snapshot = await ref.get();
  if (!snapshot.empty) {
    let videos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return videos;
  }
  return null;
};
