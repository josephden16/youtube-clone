import { useQuery } from "react-query";
import {
  getUserSubscriptionVideos,
  getUserSubscriptions,
} from "../requests/subscription";

export const useUserSubscriptionVideos = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["userSubscriptionVideos", { userId }],
    getUserSubscriptionVideos
  );

  return {
    videosLoading: isLoading,
    errorMessage: isError,
    videos: data,
    retry: refetch,
  };
};

export const useUserSubscriptions = (userId: string) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["userSubscriptions", { userId }],
    getUserSubscriptions
  );

  return {
    subscriptionsLoading: isLoading,
    errorMessage: isError,
    subscriptions: data,
    retry: refetch,
  };
};
