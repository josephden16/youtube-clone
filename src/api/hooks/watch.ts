import { useQuery } from "react-query";
import { getComments, getRelatedVideos, getVideo } from "../requests/watch";

export const watchVideoQueryKey = "watchVideo";
export const commentsQueryKey = "comments";

export const useVideo = (videoId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    [watchVideoQueryKey, { videoId }],
    getVideo
  );

  return {
    videoLoading: isLoading,
    errorMessage: isError,
    data: data,
    retry: refetch,
  };
};

export const useRelatedVideos = (currentVideoId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["relatedVideos", { currentVideoId }],
    getRelatedVideos
  );

  return {
    relatedVideosLoading: isLoading,
    errorMessage: isError,
    relatedVideos: data,
    retry: refetch,
  };
};

export const useComments = (videoId: string) => {
  const {data, isLoading, isError, refetch} = useQuery(
    [commentsQueryKey, {videoId}],
    getComments
  );

  return {
    comments: data,
    loading: isLoading,
    errorMessage: isError,
    retry: refetch,
  };
};
