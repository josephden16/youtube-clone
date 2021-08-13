import { useEffect, useState } from 'react';
import { firestore } from '../../../firebase';
import { Link } from 'react-router-dom'


const Subscriptions = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState(null);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const userId = user.uid;
      const subscriptionsRef = firestore.collection("users").doc(userId).collection("subscriptions");
      try {
        const snapshot = await subscriptionsRef.get();
        let channels = [];
        let size = snapshot.docs.length;
        snapshot.docs.forEach(async (doc, index) => {
          const channelRef = firestore.collection("channels").doc(doc.id);
          const snapshot = await channelRef.get();
          const data = { channelId: snapshot.id, ...snapshot.data() };
          channels.push(data);
          if (index === size - 1) {
            setSubscriptions(channels);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubscriptions();
  }, [user]);

  if (!(subscriptions && user)) return null;

  return (
    <ul className={subscriptions ? "dark:text-lightGray m-0 mt-16 space-y-4 text-gray" : 'hidden'}>
      {subscriptions.length > 0 && <h2 className="dark:text-white text-dark font-bold text-xl mb-4">Subscriptions</h2>}
      {subscriptions && subscriptions.map((channel: any) => (
        <li key={channel.channelId}>
          <Link to={`/channel/${channel.channelId}`} className="flex space-x-3 hover:opacity-80">
            <span>
              <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={channel.channelPhotoURL} alt="channel" />
            </span>
            <span className="mt-1 text-sm">
              {channel.channelName}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Subscriptions;
