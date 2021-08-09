import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { firestore } from "../../firebase";



export default function AddComment({ user, videoId, commentsCount, fetchComments }) {
  const [comment, setComment] = useState("");
  const inputField = useRef(null);
  const postComment = async () => {
    if (!user) {
      toast.error("You must be signed in to perform this action.");
      return;
    }

    if (comment === "") {
      toast.error("Comment field cannot be empty");
      return;
    }

    try {
      await firestore.collection("comments").doc(videoId).collection("comments").add({
        message: comment,
        timePosted: new Date(),
        userId: user.uid,
        userPhotoURL: user.photoURL,
        userName: user.displayName,
        likes: 0
      })

      await firestore.collection("videos").doc(videoId).set({
        comments: commentsCount + 1
      }, { merge: true });

      toast.dark("Added comment");

      await fetchComments();

    } catch (error) {
      toast.error("An error occured");
    }

    setComment("");
    inputField.current.value = "";
  }

  return (
    <div className="space-y-3 mt-4 ml-2 mr-2 mb-6">
      <div className="flex ml-2 lg:ml-0 space-x-4 lg:space-x-6 justify-items-start">
        <img src={user.photoURL} className="rounded-circle w-8 lg:w-10" alt={user.displayName} />
        <input ref={inputField} onChange={(evt) => setComment(evt.target.value)} type="text" placeholder="Add a comment" className="dark:bg-dark dark:border-gray text-sm w-full border-b-1 border-lightGray placeholder-lightGray outline-none" />
      </div>
      <div className="flex justify-end">
        <button style={{ outline: 'none' }} onClick={postComment} className="dark:bg-dark2 dark:text-white hover:opacity-70 transition-colors text-xs lg:text-sm bg-lightGray font-bold pl-3 pr-3 pt-2 pb-2 text-gray uppercase">Comment</button>
      </div>
    </div>
  )
}
