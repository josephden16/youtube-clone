import { Link, useLocation } from "react-router-dom";
import { useUserSubscriptions } from "../../api/hooks/subscription";
import { BiHome } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import {AiOutlineFolder} from "react-icons/ai";
import Subscriptions from "./sidebar/Subscriptions";

const SideBar = ({ user }) => {
  const location = useLocation();
  const userId = user?.uid;
  const { subscriptions, subscriptionsLoading } = useUserSubscriptions(userId);
  const getClassName = (path: string) => {
    return location.pathname === path ? "text-red" : "";
  };

  return (
    <nav className="transition-colors hidden lg:flex lg:flex-col lg:ml-0">
      <ul className="dark:text-lightGray m-0 w-full space-y-5 text-gray mt-6">
        <li
          className={
            getClassName("/") +
            ` space-x-3 items-center flex hover:text-red cursor-pointer`
          }
        >
          <Link to="/" className="space-x-3 -p-3 flex items-center">
            <BiHome size={"1.2em"} />
            <span className="text-sm">Home</span>
          </Link>
        </li>
        {user && (
          <li
            className={
              getClassName("/subscriptions") +
              " hover:text-red items-center flex transition-colors cursor-pointer"
            }
          >
            <Link to="/subscriptions" className="space-x-3 flex items-center">
              <MdOutlineSubscriptions size={"1.2em"} />
              <span className="text-sm">Subscriptions</span>
            </Link>
          </li>
        )}
        <li
          className={
            getClassName("/library") +
            " hover:text-red items-center flex transition-colors cursor-pointer"
          }
        >
          <Link to="/library" className="space-x-3 flex items-center">
            <AiOutlineFolder size={"1.2em"}/>
            <span className="text-sm">Library</span>
          </Link>
        </li>
      </ul>
      <Subscriptions
        subscriptions={subscriptions}
        loading={subscriptionsLoading}
      />
    </nav>
  );
};

export default SideBar;
