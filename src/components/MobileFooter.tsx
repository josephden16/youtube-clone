import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { faCompactDisc, faFire, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MobileFooter = () => {
  const location = useLocation();

  const getClassName = (path: string) => {
    return location.pathname === path ? "text-red" : "";
  }


  return (
    <footer style={{ borderTop: '1px solid' }} className="transition-colors dark:bg-dark dark:text-gray sticky w-full text-lightGray pb-2 pt-2 mt-4 pl-3 pr-3 bottom-0 bg-white lg:hidden">
      <div className="flex dark:text-lightGray text-gray justify-between">
        <Link to="/" className={getClassName("/")}>
          <div className="flex text-center items-center flex-col">
            <FontAwesomeIcon icon={faHome} />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link to="/" className="hover:text-red">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faFire} />
            <span className="text-xs">Trending</span>
          </div>
        </Link>

        <Link to="/" className="hover:text-red">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faCompactDisc} />
            <span className="text-xs">Subscriptions</span>
          </div>
        </Link>

        <Link to="/" className="hover:text-red">
          <div className="flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faFolder} />
            <span className="text-xs">Library</span>
          </div>
        </Link>
      </div>
    </footer>
  )
}


export default MobileFooter;
