import { useContext } from "react";
import { useQueryClient } from "react-query";
import { useComments, commentsQueryKey } from "../../api/hooks/watch";
import { UserContext } from "../providers/AuthProvider";
import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentsSkeleton from "./CommentsSkeleton";

export default function Comments({ videoId, commentsCount }) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { comments, loading } = useComments(videoId);

  const refetchComments = () => {
    queryClient.invalidateQueries(commentsQueryKey);
  };

  if (loading) return <CommentsSkeleton amount={5} />;

  return (
    <div className="mt-5 mb-10 lg:ml-3 lg:mr-3">
      <div className="ml-4 lg:ml-1">
        <span className="font-bold">Comments - {commentsCount}</span>
      </div>
      {user && (
        <AddComment
          videoId={videoId}
          fetchComments={refetchComments}
          commentsCount={commentsCount}
          user={user}
        />
      )}
      <div className="space-y-8 ml-2 lg:ml-0">
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              user={user}
              videoId={videoId}
              comment={comment}
            />
          ))}
      </div>
    </div>
  );
}
