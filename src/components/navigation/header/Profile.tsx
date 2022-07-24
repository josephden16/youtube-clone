import { Popover, Transition } from "@headlessui/react";
import { BiLogIn } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";

const Profile = ({
  user,
  handleModal,
  handleSignIn,
  loading,
  handleSignOut,
  goToProfilePage,
}) => {
  if (loading)
    return (
      <div
        className="rounded-circle bg-lightGray3 dark:bg-lightGray2 animate-pulse"
        style={{ width: "30px", height: "30px" }}
      />
    );

  if (user) {
    return (
      <Popover className="relative">
        <Popover.Button style={{ outline: "none" }} onClick={handleModal}>
          <img
            className="hover:opacity-70 rounded-circle mt-2 lg:mt-1 ml-2 cursor-pointer"
            style={{ width: "30px", height: "30px" }}
            src={user.photoURL}
            alt="profile"
          />
        </Popover.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute -right-2  z-10 w-48 rounded-md py-2 text-dark shadow-sm dark:text-white lg:right-0">
            <div
              className={
                "dark:bg-dark2 bg-lightGray rounded-md p-2 space-y-3 absolute right-4 mt-3 lg:right-8 z-40 w-52 opacity-100 transition-opacity"
              }
            >
              {user && (
                <button
                  onClick={goToProfilePage}
                  className="rounded-md space-x-2 hover:opacity-75 w-full font-bold flex flex-row items-center text-sm justify-center"
                >
                  <span>Your Channel</span>
                  <FaRegUser size="1.2em" />
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="rounded-md space-x-2 hover:opacity-70 w-full font-bold flex flex-row items-center text-sm justify-center"
              >
                <span>Sign out</span>
                <GoSignOut className="relative" style={{ top: "2px" }} />
              </button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  }
  return (
    <button
      style={{ outline: "none" }}
      onClick={handleSignIn}
      className="focus:text-opacity-60 flex items-center outline-none rounded-md border-black dark:border-lightGray"
    >
      <BiLogIn style={{ top: "4px" }} className="relative left-1 text-2xl" />
    </button>
  );
};

export default Profile;
