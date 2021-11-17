import { firestore } from "../../firebase";

export const getUserSubscriptionVideos = async ({ queryKey }) => {
  const [, { userId }] = queryKey;

  if (!userId) return;

  const getChannelIds = async (userId: string): Promise<string[]> => {
    let channelIds: string[] = [];
    const subscriptionsRef = firestore
      .collection("users")
      .doc(userId)
      .collection("subscriptions");
    try {
      const snapshot = await subscriptionsRef.get();
      snapshot.docs.forEach((doc) => {
        channelIds.push(doc.id);
      });
      return channelIds;
    } catch (error) {}
  };

  const getVideos = async (channelIds: string[]): Promise<any> => {
    const videosRef = firestore
      .collection("videos")
      .where("channelId", "in", channelIds);

    try {
      const snapshot = await videosRef.get();
      let videos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return videos;
    } catch (error) {}
  };

  try {
    const channelIds: string[] = await getChannelIds(userId);
    const videos: any[] = await getVideos(channelIds);
    return videos;
  } catch {}
};

export const getUserSubscriptions = async ({ queryKey }) => {
  const [, { userId }] = queryKey;

  if (!userId) return;

  const subscriptionsRef = firestore
    .collection("users")
    .doc(userId)
    .collection("subscriptions")
    .limit(5);

  try {
    const snapshot = await subscriptionsRef.get();
    const subscriptionPromises = snapshot.docs.map(async (doc, index) => {
      const channelRef = firestore.collection("channels").doc(doc.id);
      const promise = new Promise((resolve, reject) => {
        const snapshot = channelRef.get();
        snapshot.then((doc) => {
          const data = { id: doc.id, ...doc.data() };
          resolve(data);
        });
      });
      return promise;
    });
    return new Promise((resolve, reject) => {
      Promise.all(subscriptionPromises).then((subscriptions) => {
        resolve(subscriptions);
      });
    });
  } catch (error) {
    throw error;
  }
};
