import React from 'react';
import { faClock, faFire, faFolder, faHeart, faHome, faPlay, faScroll, faStar, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profileImg from '../images/profile.jpg';
import user from '../images/user.png';


const SideBar = () => {
  return (
    <nav className="hidden lg:flex lg:flex-col lg:ml-0">
      <ul className="m-0 p-0 space-y-4 text-gray mt-6">
        <li className="text-red space-x-4 hover:text-red cursor-pointer">
          <FontAwesomeIcon icon={faHome} /> <span>Home</span>
        </li>
        <li className="space-x-5 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFire} /> <span>Trending</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faPlay} /> <span>Subscriptions</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faFolder} /> <span>Library</span>
        </li>
        <li className="space-x-3 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faScroll} /> <span>History</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faClock} /> <span>Watch later</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faStar} /> <span>Favourites</span>
        </li>
        <li className="space-x-4 hover:text-red transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faHeart} /> <span>Likes</span>
        </li>
      </ul>

      <ul className="p-0 m-0 mt-16 space-y-5 text-gray">
        <h2 className="font-bold text-xl mb-2">Subscriptions</h2>
        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '35px', height: '35px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '35px', height: '35px' }} src={profileImg} alt="channel" />
          </span>
          <span className="mt-1">
            Joseph Denedo
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '35px', height: '35px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1">
            Leah Berry
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '35px', height: '35px' }} src={profileImg} alt="channel" />
          </span>
          <span className="mt-1">
            Joseph Denedo
          </span>
        </li>

        <li className="flex space-x-3">
          <span>
            <img className="rounded-circle" style={{ width: '35px', height: '35px' }} src={user} alt="channel" />
          </span>
          <span className="mt-1">
            Leah Berry
          </span>
        </li>
      </ul>
      
      <div className="text-gray text-xl mt-28 mb-8 hover:text-black transition-colors cursor-pointer">
        <FontAwesomeIcon icon={faCog} /> <span className="ml-2">Settings</span>
      </div>
    </nav>
  )
}

export default SideBar;
