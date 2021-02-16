import React from 'react';
import { faClock, faFire, faFolder, faHeart, faHome, faScroll, faStar, faCog, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profileImg from '../images/profile.jpg';
import user from '../images/user.png';


const SideBar = () => {
  return (
    <nav className="transition-colors hidden lg:flex lg:flex-col lg:ml-0">
      <ul className="dark:text-lightGray m-0 p-0 space-y-4 text-gray mt-6">
        <li className="text-red space-x-3 hover:text-red cursor-pointer">
          <FontAwesomeIcon icon={faHome} /> <span className="text-sm">Home</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFire} /> <span className="text-sm">Trending</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faCompactDisc} /> <span className="text-sm">Subscriptions</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFolder} /> <span className="text-sm">Library</span>
        </li>
        <li className="space-x-2 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faScroll} /> <span className="text-sm">History</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faClock} /> <span className="text-sm">Watch later</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faStar} /> <span className="text-sm">Favourites</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faHeart} /> <span className="text-sm">Likes</span>
        </li>
      </ul>

      <ul className="dark:text-lightGray m-0 mt-16 space-y-5 text-gray">
        <h2 className="dark:text-white font-bold text-xl mb-2">Subscriptions</h2>
        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={profileImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Tega Denedo
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={profileImg} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Tega Denedo
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '30px', height: '30px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1 text-sm">
            Leah Berry
          </span>
        </li>
      </ul>

      <div className="flex items-center dark:text-lightGray dark:hover:text-lightGray text-gray text-xl mt-28 mb-8 hover:text-black transition-colors cursor-pointer">
        <FontAwesomeIcon icon={faCog} /> <span className="ml-2 text-sm">Settings</span>
      </div>
    </nav>
  )
}

export default SideBar;
