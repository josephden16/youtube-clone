import { useState } from "react";
import { toast } from "react-toastify";
import { firestore } from "../../firebase";
import { formatTime } from "../../utils";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Comment({ user, comment, videoId }) {
  let [likes, setLikes] = useState(comment.likes);
  let time: string = "some time ago";

  if (comment.timePosted) {
    let unixTime = comment.timePosted.seconds;
    time = formatTime(unixTime);
  }
  const handleLike = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action");
      return;
    }
    let commentRef = firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id);
    let likedRef = firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid);
    let likedSnapshot = await likedRef.get();

    if (!likedSnapshot.exists) {
      try {
        await firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid).set({
          user: user.displayName
        });
        commentRef.set({
          likes: likes + 1
        }, { merge: true });
        setLikes(likes + 1);
        toast.dark("Liked comment");
      } catch (error) {
        toast.error("An error occured");
      }
      return;
    } else {
      await commentRef.set({
        likes: likes - 1
      }, { merge: true });
      setLikes(likes - 1);
      await firestore.collection("comments").doc(videoId).collection("comments").doc(comment.id).collection("liked").doc(user.uid).delete();
    }
  }

  return (
    <div className="flex flex-col space-y-1 gap-2 mt-4 lg:mt-10 ml-2 mr-2">
      <div>
        <img className="rounded-circle w-8 lg:w-10" src={comment.userPhotoURL} alt={comment.userName} />
      </div>
      <div className="flex flex-col space-y-2 flex-wrap">
        <div className="text-xs lg:text-sm space-x-2">
          <span className="font-bold">{comment.userName}</span>
          <span className="text-gray dark:text-lightGray">{time}</span>
        </div>
        <div className="text-sm lg:text-base">
          <span>{comment.message}</span>
        </div>
        <div className="dark:text-lightGray text-gray flex items-center space-x-2">
          <button style={{ outline: 'none' }} onClick={handleLike} className="hover:opacity-70 text-gray dark:text-lightGray">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <span className="text-sm">{likes}</span>
        </div>
      </div>
    </div>
  )
}
