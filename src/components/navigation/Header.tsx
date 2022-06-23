import { KeyboardEvent, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../firebase";
import { FaVideo, FaSearch } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { UserContext } from "../providers/AuthProvider";
import Profile from "./header/Profile";
import Logo from "./header/Logo";
import ThemeToggle from "./header/ThemeToggle";
import MobileSearch from "./header/MobileSearch";
import { Theme } from "../../typings";
import { useTheme } from "../providers/ThemeProvider";

const Header = (props: any) => {
  const { updateThemeContext } = useTheme();
  const [isOpen, setOpen] = useState(false);
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

  const changeTheme = (theme: Theme): void => {
    updateThemeContext(theme);
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

  const handleEnterKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery !== "") {
      history.push(`/search?q=${searchQuery}`);
    }
  };

  const goToProfilePage = () => {
    if (!user) return;

    history.push(`/channel/${user.uid}`);
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
            <Logo />
          </Link>
        </div>
        <div className="flex justify-end lg:justify-between w-full md:w-full md:mt-1">
          <div className="hidden lg:block lg:ml-24 lg:mt-1">
            <input
              onChange={(evt) => handleSearchEntry(evt.target.value)}
              onKeyPress={(evt) => handleEnterKeyPress(evt)}
              style={{
                width: "460px",
                paddingTop: "7px",
                paddingBottom: "7px",
              }}
              className="dark:bg-dark2 text-sm -mt-2 md:mt-0 placeholder-gray dark:placeholder-white dark:text-white bg-lightGray pl-4 pr-9 rounded-3xl outline-none"
              type="text"
              name="search"
              placeholder="Search"
              title="search"
            />
            <button
              style={{ top: "3px" }}
              className="relative rounded-circle text-center right-9 py-2 px-2"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
          <div className="md:-mt-0 lg:mt-0 lg:mr-4 flex align-middle items-center">
            <button onClick={openSearch} className="mt-1 md:mr-2 lg:hidden">
              <FaSearch
                className="dark:text-lightGray text-black"
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
              className="ml-4 mr-2 lg:mt-0 lg:ml-3 lg:mr-2"
              handleThemeToggle={handleThemeToggle}
            />
            <Profile
              loading={loading}
              handleSignIn={handleSignIn}
              handleModal={handleModal}
              user={user}
              handleSignOut={handleSignOut}
              goToProfilePage={goToProfilePage}
            />
          </div>
        </div>
      </header>
      <MobileSearch
        open={isOpen}
        handleClose={closeSearch}
        handleSearch={handleSearch}
        handleSearchEntry={handleSearchEntry}
        handleEnterKeyPress={handleEnterKeyPress}
      />
    </>
  );
};

export default Header;
//TODO: Add notifications feature later...
