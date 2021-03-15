import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { faFire, faFolder, faHome, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from './providers/AuthProvider';
import { firestore } from '../firebase';
// import userImg from '../images/user.png';


const SideBar = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const getClassName = (path: string) => {
    return location.pathname === path ? "text-red" : "";
  }

  return (
    <nav className="transition-colors hidden lg:flex lg:flex-col lg:ml-0">
      <ul className="dark:text-lightGray m-0 w-full space-y-5 text-gray mt-6">
        <li className={getClassName('/') + ` space-x-3 items-center flex hover:text-red cursor-pointer`}>
          <Link to="/" className="space-x-2 -p-3"><FontAwesomeIcon icon={faHome} /> <span className="text-sm">Home</span></Link>
        </li>
        <li className={getClassName('/trending-videos') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="/trending-videos" className="space-x-3"><FontAwesomeIcon icon={faFire} /> <span className="text-sm">Trending</span></Link>
        </li>
        {user && <li className={getClassName('/subscriptions') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="/subscriptions" className="space-x-3 flex items-center"><FontAwesomeIcon icon={faCompactDisc} /> <span className="text-sm">Subscriptions</span></Link>
        </li>}
        <li className={getClassName('/library') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="library" className="space-x-2"><FontAwesomeIcon icon={faFolder} /> <span className="text-sm">Library</span></Link>
        </li>
        {/* <li className={getClassName('/feed/#liked-videos') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="/liked-videos" className="space-x-3 flex items-center"><FontAwesomeIcon icon={faHeart} /> <span className="text-sm">Liked Videos</span></Link>
        </li> */}
      </ul>
      {user && <Subscriptions user={user} />}
      {/* <div className="flex items-center dark:text-lightGray dark:hover:text-lightGray text-gray text-xl mt-28 mb-8 hover:text-black transition-colors cursor-pointer">
        <FontAwesomeIcon icon={faCog} /> <span className="ml-2 text-sm">Settings</span>
      </div> */}
    </nav>
  )
}

const Subscriptions = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptionsRef = firestore.collection("users").doc(user.uid).collection("subscriptions");
      const snapshot = await subscriptionsRef.get();
      let channels = [];
      snapshot.docs.forEach(async doc => {
        const channelRef = firestore.collection("channels").doc(doc.id);
        const snapshot = await channelRef.get();
        const data = { channelId: snapshot.id, ...snapshot.data() };
        channels.push(data);
      });
      setSubscriptions(channels);
    }
    fetchSubscriptions();
  }, [user.uid]);

  if (!subscriptions) return null;

  return (
    <ul className={user ? "dark:text-lightGray m-0 mt-16 space-y-4 text-gray" : 'hidden'}>
      {subscriptions.length > 0 && <h2 className="dark:text-white font-bold text-xl mb-4">Subscriptions</h2>}
      {subscriptions && subscriptions.map((channel: any) => (
        <li key={channel.channelId}>
          <Link to={`/channel/${channel.channelId}`} className="flex space-x-3">
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

export default SideBar;
