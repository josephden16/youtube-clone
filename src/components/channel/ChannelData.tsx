import  { useContext } from "react";
import {FaSearch} from "react-icons/fa";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../providers/AuthProvider";
import { channelDataQueryKey } from "../../api/hooks/channel";
import { useQueryClient } from "react-query";
import { firestore } from "../../firebase";
import { toast } from "react-toastify";
import ChannelDataSkeleton from "./ChannelDataSkeleton";

export default function ChannelData({ channelData, homeClass, videoClass, loading }) {
  let { url } = useRouteMatch();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();


  const subscribeToChannel = async (
    userRef: any,
    channelRef: any,
    subscriberRef: any,
    channelId: any,
    userId: any
  ) => {
    try {
      await userRef.collection("subscriptions").doc(channelId).set(
        {
          channelId: channelId,
          channelPhotoURL: channelData.channelPhotoURL,
          channelDisplayName: channelData.channelName,
        },
        { merge: true }
      );
      await subscriberRef.set(
        {
          userId: userId,
          userDisplayName: user.displayName,
        },
        { merge: true }
      );
      await channelRef.set(
        {
          subscribersCount: channelData.subscribersCount + 1,
        },
        { merge: true }
      );
      queryClient.invalidateQueries(channelDataQueryKey);
      toast.success("You've subscribed to this channel");
    } catch (error) {
      toast.error("Failed to subscribe to channel");
    }
  };

  const unsubscribeFromChannel = async (
    userRef: any,
    channelRef: any,
    subscriberRef: any,
    channelId: any
  ) => {
    try {
      await subscriberRef.delete();
      await userRef.collection("subscriptions").doc(channelId).delete();
      await channelRef.set(
        {
          subscribersCount: channelData.subscribersCount - 1,
        },
        { merge: true }
      );
      queryClient.invalidateQueries(channelDataQueryKey);
      toast.success("You've unsubscribed from this channel");
    } catch (error) {
      console.log(error);
      toast.error("Failed to unsubscribe from channel");
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("You must be signed in to subscribe");
      return;
    }

    const channelId = channelData.id;
    const userId = user.uid;
    const userRef = firestore.collection("users").doc(userId);
    const channelRef = firestore.collection("channels").doc(channelId);
    const subscriberRef = channelRef.collection("subscribers").doc(userId);
    const snapshot = await subscriberRef.get();

    if (userId === channelId) {
      toast.warning("You can't subscribe to your own channel");
      return;
    }

    if (!snapshot.exists) {
      subscribeToChannel(userRef, channelRef, subscriberRef, channelId, userId);
    } else {
      unsubscribeFromChannel(userRef, channelRef, subscriberRef, channelId);
    }
  };

  if (loading) return <ChannelDataSkeleton />

  if (!loading && !channelData) return null;

  return (
    <section className="mx-2">
      <div className="flex flex-col md:flex-row md:justify-between lg:items-center space-y-3 ml-2 lg:-ml-2 xl:-ml-1 md:mr-3">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4  lg:space-x-6">
          <div>
            <img
              className="w-20 lg:w-auto rounded-circle"
              src={channelData.channelPhotoURL}
              alt="channel owner"
            />
          </div>
          <div>
            <h2 className="font-bold lg:text-xl">{channelData.channelName}</h2>
            <div className="dark:text-lightGray">
              {channelData.subscribersCount} subscribed
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleSubscribe}
            className="bg-red rounded-3xl pb-2 pt-2 pl-3 pr-3 text-white"
          >
            Subscribe {channelData.subscribersCount}
          </button>
        </div>
      </div>
      <div className="ml-2 lg:ml-0 no-scrollbar w-80 sm:w-full mt-10">
        <ul className="flex flex-row m-0 p-0 space-x-6 lg:space-x-12 items-center text-sm lg:text-base dark:text-lightGray dark:border-dark">
          <Link className={homeClass} to={`${url}`}>
            Home
          </Link>
          <Link className={videoClass} to={`${url}/videos`}>
            Videos
          </Link>
          <li className="flex items-center mb-1 lg:block space-x-4">
            <button className="outline-none">
              <FaSearch size="1.1em" />
            </button>
            <input
              className="dark:bg-dark placeholder-black dark:placeholder-lightGray dark:text-lightGray border-b-2 outline-none dark:border-lightGray"
              type="search"
              placeholder="Search channel..."
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
