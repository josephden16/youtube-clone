import { useState, useContext, useEffect } from "react";
import { firestore } from "../../firebase";
import { UserContext } from "../providers/AuthProvider";
import AddComment from "./AddComment";
import Comment from "./Comment";
import Loading from "./Loading";


export default function Comments({ videoId, commentsCount }) {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      let commentsRef = firestore.collection("comments").doc(videoId).collection("comments").orderBy("likes", "desc").limit(5);
      let snapshot = await commentsRef.get();
      let comments = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setComments(comments);
      setLoading(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (loading) return <Loading loading={loading} msg="Fetching comments..." />;

  return (
    <div className="mt-5 mb-10 lg:ml-3 lg:mr-3">
      <div className="ml-4 lg:ml-1">
        <span className="font-bold">Comments {commentsCount}</span>
      </div>
      {user && <AddComment videoId={videoId} fetchComments={fetchData} commentsCount={commentsCount} user={user} />}
      <div className="space-y-8 ml-2 lg:ml-0">
        {comments && comments.map(comment => <Comment key={comment.id} user={user} videoId={videoId} comment={comment} />)}
      </div>
    </div>
  )
}
