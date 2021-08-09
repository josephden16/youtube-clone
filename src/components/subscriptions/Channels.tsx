import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import Channel from "./Channel";


export default function Channels({ user }) {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const userId = user.uid;
      const subscriptionsRef = firestore.collection("users").doc(userId).collection("subscriptions").limit(5);
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

  if (!subscriptions) return null;

  return (
    <div className="flex flex-row ml-2 lg:ml-0 space-x-4 lg:space-x-7 items-center lg:items-start overflow-hidden whitespace-nowrap">
      {subscriptions.length > 0 && subscriptions.map((channel: any, index: number) => (
        <Channel key={index} channel={channel} />
      ))}
      <Link to="/subscriptions/all" className="m-auto text-xs lg:text-sm uppercase font-bold ml-6">see all</Link>
    </div>
  )
}
