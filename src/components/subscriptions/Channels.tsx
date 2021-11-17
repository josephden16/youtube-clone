import { Link } from "react-router-dom";
import Channel from "./Channel";
import ChannelsSkeleton from "./ChannelsSkeleton";

export default function Channels({ subscriptions, loading }) {
  if (loading) return <ChannelsSkeleton amount={4} />;

  return (
    <>
      <h1 className="ml-2 lg:ml-0 font-semibold text-2xl lg:text-3xl mb-4 lg:mb-6">Your subscriptions</h1>
      <div className="flex flex-row ml-2 lg:ml-0 space-x-4 lg:space-x-7 items-center lg:items-start overflow-hidden whitespace-nowrap">
        {!loading &&
          subscriptions.length > 0 &&
          subscriptions.map((channel: any, index: number) => (
            <Channel key={index} channel={channel} />
          ))}
        {!loading && subscriptions.length > 0 && (
          <Link
            to="/subscriptions/all"
            className="m-auto text-xs lg:text-sm uppercase font-bold ml-6"
          >
            see all
          </Link>
        )}
      </div>
    </>
  );
}
