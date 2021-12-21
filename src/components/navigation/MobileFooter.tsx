import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import {AiOutlineFolder} from "react-icons/ai";

const MobileFooter = () => {
  const location = useLocation();

  const getClassName = (path: string) => {
    return location.pathname === path
      ? "text-red hover:text-red"
      : "hover:text-red";
  };

  return (
    <footer
      style={{ borderTop: "1px solid" }}
      className="transition-colors dark:bg-dark dark:text-gray fixed w-full text-lightGray pb-2 pt-2 mt-4 pl-6 pr-6 bottom-0 bg-white lg:hidden"
    >
      <div className="flex dark:text-lightGray text-black justify-between">
        <Link to="/" className={getClassName("/")}>
          <div className="flex text-center items-center flex-col">
            <BiHome size="1.2em" />
            <span className="text-xs">Home</span>
          </div>
        </Link>
        <Link to="/subscriptions" className={getClassName("/subscriptions")}>
          <div className="flex flex-col items-center text-center">
            <MdOutlineSubscriptions size="1.2em"/>
            <span className="text-xs">Subscriptions</span>
          </div>
        </Link>

        <Link to="/library" className={getClassName("/library")}>
          <div className="flex flex-col items-center text-c enter">
            <AiOutlineFolder size="1.2em" />
            <span className="text-xs">Library</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default MobileFooter;
