import { useQuery } from "react-query";
import { getLikedVideos, getWatchLaterVideos } from "../requests/library";

export const useLikedVideos = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["likedVideos", { userId }],
    getLikedVideos
  );

  return {
    likedVideosLoading: isLoading,
    errorMessage: isError,
    likedVideos: data,
    retry: refetch,
  };
};

export const useWatchLaterVideos = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["watchLaterVideos", { userId }],
    getWatchLaterVideos
  );

  return {
    watchLaterVideosLoading: isLoading,
    errorMessage: isError,
    watchLaterVideos: data,
    retry: refetch,
  };
};
