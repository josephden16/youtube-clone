import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { faCompactDisc, faFireAlt, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MobileFooter = () => {
  const location = useLocation();

  const getClassName = (path: string) => {
    return location.pathname === path ? "text-red hover:text-red" : "hover:text-red";
  }


  return (
    <footer style={{ borderTop: '1px solid' }} className="transition-colors dark:bg-dark dark:text-gray fixed w-full text-lightGray pb-2 pt-2 mt-4 pl-6 pr-6 bottom-0 bg-white lg:hidden">
      <div className="flex dark:text-lightGray text-gray justify-between">
        <Link to="/" className={getClassName("/")}>
          <div className="flex text-center items-center flex-col">
            <FontAwesomeIcon icon={faHome} />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link to="/trending" className={getClassName("/trending")}>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faFireAlt} />
            <span className="text-xs">Trending</span>
          </div>
        </Link>

        <Link to="/subscriptions" className={getClassName("/subscriptions")}>
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faCompactDisc} />
            <span className="text-xs">Subscriptions</span>
          </div>
        </Link>

        <Link to="/library" className={getClassName("/library")}>
          <div className="flex flex-col items-center text-c enter">
            <FontAwesomeIcon icon={faFolder} />
            <span className="text-xs">Library</span>
          </div>
        </Link>
      </div>
    </footer>
  )
}


export default MobileFooter;
