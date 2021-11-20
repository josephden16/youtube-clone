import { firestore } from "../../firebase";

export const getLikedVideos = async ({ queryKey }) => {
  const [, { userId }] = queryKey;

  const likedVideosRef = firestore
    .collection("users")
    .doc(userId)
    .collection("likedVideos");
  const snapshot = await likedVideosRef.get();
  const videosPromises = snapshot.docs.map(async (doc) => {
    const videoRef = firestore.collection("videos").doc(doc.id);
    const videoPromise = new Promise((resolve, reject) => {
      videoRef
        .get()
        .then((doc) => {
          const data = doc.data();
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return videoPromise;
  });

  return new Promise((resolve, reject) => {
    Promise.all(videosPromises)
      .then((videos) => {
        resolve(videos);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getWatchLaterVideos = async ({ queryKey }) => {
  const [, { userId }] = queryKey;

  const watchLaterVideosRef = firestore
    .collection("users")
    .doc(userId)
    .collection("watchLater")
    .orderBy("timeAdded", "desc");
  const snapshot = await watchLaterVideosRef.get();
  const videosPromises = snapshot.docs.map(async (doc) => {
    const videoRef = firestore.collection("videos").doc(doc.id);
    const videoPromise = new Promise((resolve, reject) => {
      videoRef.get()
        .then(doc => {
          const data = doc.data();
          resolve(data);
        })
        .catch(err => {
          reject(err);
        })
    });
    return videoPromise;
  });

  return new Promise((resolve, reject) => {
    Promise.all(videosPromises)
      .then(videos => {
        resolve(videos);
      })
      .catch(err => {
        reject(err);
      })
  })
};
