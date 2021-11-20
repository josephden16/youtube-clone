import { useQuery } from "react-query";
import { getChannelData, getChannelVideos } from "../requests/channel";

export const channelDataQueryKey = "channelData";
export const useChannelData = (channelId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    [channelDataQueryKey, { channelId }],
    getChannelData
  );

  return {
    channelDataLoading: isLoading,
    errorMessage: isError,
    channelData: data,
    retry: refetch,
  };
}

export const channelVideosQueryKey = "channelVideos";
export const useChannelVideos = (channelId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    [channelVideosQueryKey, { channelId }],
    getChannelVideos
  );

  return {
    channelVideosLoading: isLoading,
    errorMessage: isError,
    channelVideos: data,
    retry: refetch,
  };
}
