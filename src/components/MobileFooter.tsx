import { faFire, faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const MobileFooter = () => {
  return (
    <footer style={{ borderTop: '1px solid' }} className="sticky w-full text-lightGray pb-2 pt-2 mt-4 pl-3 pr-3 bottom-0 bg-white lg:hidden">
      <div className="flex text-gray justify-between">
        <div className="flex text-center items-center flex-col text-red">
          <FontAwesomeIcon icon={faHome} />
          <span className="text-xs">Home</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faFire} />
          <span className="text-xs">Trending</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faFolder} />
          <span className="text-xs">Subscriptions</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faFolder} />
          <span className="text-xs">Library</span>
        </div>
      </div>
    </footer>
  )
}


export default MobileFooter;
