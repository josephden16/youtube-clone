import { Link } from "react-router-dom";
import SubscriptionsSkeleton from "./SubscriptionsSkeleton";

const Subscriptions = ({ loading, subscriptions }) => {
  if (loading) return <SubscriptionsSkeleton amount={4} />;

  if (!subscriptions && !loading) return null;

  return (
    <ul
      className={
        subscriptions
          ? "dark:text-lightGray m-0 mt-16 space-y-4 text-black"
          : "hidden"
      }
    >
      {subscriptions.length > 0 && (
        <h2 className="dark:text-white text-dark font-bold text-xl mb-4">
          Subscriptions
        </h2>
      )}
      {subscriptions &&
        subscriptions.map((channel: any) => (
          <li key={channel.id}>
            <Link
              to={`/channel/${channel.id}`}
              className="flex space-x-3 hover:opacity-80 items-center"
            >
              <span>
                <img
                  className="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                  src={channel.channelPhotoURL}
                  alt="channel"
                />
              </span>
              <span className="mt-1 text-sm">{channel.channelName}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Subscriptions;
