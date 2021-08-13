import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { faFire, faFolder, faHome, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../providers/AuthProvider';
import Subscriptions from './sidebar/Subscriptions';


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
          <Link to="/" className="space-x-3 -p-3 flex items-center"><FontAwesomeIcon icon={faHome} /> <span className="text-sm">Home</span></Link>
        </li>
        <li className={getClassName('/trending') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="/trending" className="space-x-4 flex items-center"><FontAwesomeIcon icon={faFire} /> <span className="text-sm">Trending</span></Link>
        </li>
        {user && <li className={getClassName('/subscriptions') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="/subscriptions" className="space-x-3 flex items-center"><FontAwesomeIcon icon={faCompactDisc} /> <span className="text-sm">Subscriptions</span></Link>
        </li>}
        <li className={getClassName('/library') + ' hover:text-red items-center flex transition-colors cursor-pointer'}>
          <Link to="library" className="space-x-3 flex items-center"><FontAwesomeIcon icon={faFolder} /> <span className="text-sm">Library</span></Link>
        </li>
      </ul>
      {user && <Subscriptions user={user} />}
    </nav>
  )
}

export default SideBar;
