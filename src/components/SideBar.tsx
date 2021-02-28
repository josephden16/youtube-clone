import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { faClock, faFire, faFolder, faHeart, faHome, faStar, faCog, faCompactDisc, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userImg from '../images/user.png';
import { UserContext } from './providers/AuthProvider';


const SideBar = () => {
  const user = useContext(UserContext);
  return (
    <nav className="transition-colors hidden lg:flex lg:flex-col lg:ml-0">
      <ul className="dark:text-lightGray m-0 p-0 w-full space-y-5 text-gray mt-6">
        <li className="text-red space-x-3 items-center flex hover:text-red cursor-pointer">
          <FontAwesomeIcon icon={faHome} /> <span className="text-sm">Home</span>
        </li>
        <li className="hover:text-red items-center flex transition-colors cursor-pointer">
          <Link className="space-x-2" to="/videos"><FontAwesomeIcon icon={faVideo} /> <span className="text-sm">My Videos</span></Link>
        </li>
        <li className="space-x-4 hover:text-red items-center flex transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFire} /> <span className="text-sm">Trending</span>
        </li>
        <li className="space-x-3 hover:text-red items-center flex transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faCompactDisc} /> <span className="text-sm">Subscriptions</span>
        </li>
        <li className="space-x-3 hover:text-red items-center flex transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFolder} /> <span className="text-sm">Library</span>
        </li>
        <li className="space-x-3 hover:text-red items-center flex transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faHeart} /> <span className="text-sm">Likes</span>
        </li>
      </ul>

      <ul className={user ? "dark:text-lightGray m-0 mt-16 space-y-5 text-gray" : 'hidden'}>
        <h2 className="dark:text-white font-bold text-xl mb-2">Subscriptions</h2>
        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={userImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={userImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={userImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={userImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={userImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>
      </ul>

      {/* <div className="flex items-center dark:text-lightGray dark:hover:text-lightGray text-gray text-xl mt-28 mb-8 hover:text-black transition-colors cursor-pointer">
        <FontAwesomeIcon icon={faCog} /> <span className="ml-2 text-sm">Settings</span>
      </div> */}
    </nav>
  )
}

export default SideBar;
