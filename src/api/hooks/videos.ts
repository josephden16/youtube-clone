import { useQuery } from "react-query";
import { getHomePageVideos } from "../requests/videos";

export const useHomePageVideos = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "homePageVideos",
    getHomePageVideos
  );

  return {
    loading: isLoading,
    errorMessage: isError,
    videos: data,
    retry: refetch,
  };
};
