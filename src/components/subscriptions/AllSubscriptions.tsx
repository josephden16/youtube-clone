import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";


export default function AllSubscriptions({ user }) {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const userId = user?.uid;
      const subscriptionsRef = firestore.collection("users").doc(userId).collection("subscriptions");
      try {
        const snapshot = await subscriptionsRef.get();
        const size = snapshot.docs.length;
        let subs = [];
        snapshot.docs.forEach(async (doc, index) => {
          const channelRef = firestore.collection("channels").doc(doc.id);
          const snapshot = await channelRef.get();
          const data = { id: snapshot.id, ...doc.data() };
          subs.push(data);
          if (index === size - 1) {
            setSubscriptions(subs);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubscriptions();
  }, [user]);

  if (!user) return null;

  return (
    <div className="lg:-ml-3 w-full">
      <h1 className="text-xl lg:text-3xl font-bold">All Subscriptions &#127909;</h1>
      <div className="space-y-4 mt-7 flex flex-col lg:flex-row lg:flex-wrap lg:space-y-0 lg:space-x-4">
        {subscriptions && subscriptions.map((channel, index) => (
          <div key={index}>
            <Link to={"/channel/" + channel.id} className="flex lg:grid space-x-2 lg:grid-cols-1 lg:space-x-0 lg:place-items-center items-center space-y-1 hover:opacity-70">
              <img src={channel.channelPhotoURL} className="w-12 lg:w-14 rounded-circle" alt="channel" />
              <span className="text-base text-center lg:text-sm">{channel.channelDisplayName}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
