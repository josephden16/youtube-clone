import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../firebase";
import { FaVideo, FaSearch, FaRegUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { UserContext } from "../providers/AuthProvider";
import Profile from "./header/Profile";
import Logo from "./header/Logo";
import ThemeToggle from "./header/ThemeToggle";
import MobileSearch from "./header/MobileSearch";

const Header = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading } = useContext(UserContext);
  const history = useHistory();

  const handleModal = (): void => {
    setModalOpen(!modalOpen);
  };

  const handleSignIn = () => {
    setModalOpen(false);
    signInWithGoogle();
  };

  const handleSignOut = (): void => {
    setModalOpen(false);
    signOut();
  };

  const handleThemeToggle = (): void => {
    const isDarkModeEnabled =
      document.documentElement.classList.contains("dark");
    if (isDarkModeEnabled) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      changeTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      changeTheme("dark");
    }
  };

  const changeTheme = (theme: string): void => {
    setTheme(theme);
  };

  const openSearch = (): void => {
    setOpen(!isOpen);
  };

  const closeSearch = (): void => {
    setOpen(false);
  };

  const handleMenuClick = (): void => {
    if (props.handleMenu) {
      props.handleMenu();
    }
    return;
  };

  const handleSearchEntry = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  const handleSearch = () => {
    if (searchQuery !== "") {
      history.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <>
      <header className="dark:bg-dark flex ml-2 items-center mr-2 lg:ml-0 lg:mr-0 pt-1">
        <div className="flex">
          <button
            style={{ outline: "transparent" }}
            onClick={handleMenuClick}
            className={
              props.sidebar
                ? "relative lg:top-2 hidden lg:block mr-4 dark:focus:outline-white"
                : "hidden"
            }
          >
            <AiOutlineMenu size="1.22em" />
          </button>
          <Link to="/">
            <Logo theme={theme} />
          </Link>
        </div>
        <div className="flex justify-end lg:justify-between w-full md:w-full md:mt-1">
          <div className="hidden lg:block lg:ml-24 lg:mt-1">
            <input
              onChange={(evt) => handleSearchEntry(evt.target.value)}
              style={{
                width: "460px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
              className="dark:bg-dark2 text-sm -mt-2 md:-mt-0 shadow-lg placeholder-gray dark:placeholder-white dark:text-white bg-lightGray pl-4 pr-9 rounded-3xl outline-none"
              type="text"
              name="search"
              placeholder="Search"
              title="search"
            />
            <button
              style={{
                paddingTop: "3px",
                paddingBottom: "6px",
                paddingLeft: "11px",
                paddingRight: "11px",
                left: "-34px",
              }}
              className="bg-gray dark:bg-dark shadow-md relative rounded-circle"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
          <div className="md:-mt-0 lg:mt-0 lg:mr-4 flex align-middle items-center">
            <button onClick={openSearch} className="mt-1 md:mr-2 lg:hidden">
              <FaSearch
                className="dark:text-lightGray text-gray"
                style={{ marginTop: "4px", fontSize: "16px" }}
              />
            </button>
            {user && (
              <Link to={`/channel/${user.uid}/videos`}>
                <FaVideo
                  size="17px"
                  className="dark:text-lightGray hidden text-gray md:mr-2 md:mt-2 lg:mr-4 lg:mt-0"
                />
              </Link>
            )}
            <ThemeToggle
              className="ml-4 mt-1 mr-2 lg:-mt-1 lg:ml-3 lg:mr-4"
              handleThemeToggle={handleThemeToggle}
            />
            <Profile
              loading={loading}
              handleSignIn={handleSignIn}
              handleModal={handleModal}
              user={user}
            />
          </div>
        </div>
      </header>
      <div
        className={
          modalOpen
            ? "dark:bg-dark2 bg-lightGray rounded-md p-2 space-y-3 absolute right-4 mt-3 lg:right-8 z-40 w-52 opacity-100 transition-opacity"
            : "hidden opacity-0"
        }
      >
        {user && (
          <button className="space-x-2 flex items-center justify-center hover:opacity-70 w-full font-bold">
            <Link to={`/channel/${user.uid}`}>
              <span>Your Channel</span> <FaRegUser size="1.2em" />
            </Link>
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="space-x-2 hover:opacity-70 w-full font-bold"
        >
          <span>Sign out</span> <GoSignOut />
        </button>
      </div>
      <MobileSearch
        open={isOpen}
        handleClose={closeSearch}
        handleSearch={handleSearch}
        handleSearchEntry={handleSearchEntry}
      />
    </>
  );
};

export default Header;
//TODO: Add notifications feature later...
