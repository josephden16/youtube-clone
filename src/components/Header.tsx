import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { signInWithGoogle, signOut } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faExchangeAlt, faMoon, faSearch, faSignOutAlt, faSun, faUser, faUserAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import logoLight from '../images/logo-light.svg';
import logoDark from '../images/logo-dark.svg';
import { UserContext } from './providers/AuthProvider';



const Profile = ({ user, handleModal, handleSignIn }) => {
  if (user) {
    return (
      <button style={{outline: 'none'}} onClick={handleModal}>
        <img  className="hover:opacity-70 rounded-circle mt-1 lg:-mt-1 ml-2 cursor-pointer" style={{ width: '30px', height: '30px' }} src={user.photoURL} alt="profile" />
      </button>
    ) 
  }
  return (
    <button style={{ outline: 'none' }} onClick={handleSignIn} className="focus:text-opacity-60 space-x-1 pb-1 pt-1 flex items-center outline-none border-1 rounded-sm border-red dark:border-lightGray ml-3 -mr-1 mt-1 lg:mb-1">
      <FontAwesomeIcon icon={faUser} className="text-red  dark:text-lightGray ml-1 lg:mt-0" style={{ fontSize: '15px' }} />
      <span className="pr-1 text-xs dark:text-lightGray text-red">SIGN IN</span>
    </button>
  )
}

const Logo = ({ theme }) => {
  let classList = document.documentElement.classList;

  if (classList.contains("dark") || theme === "dark") {
    return <img src={logoDark} className="mt-2 md:mt-3 lg:mt-3 w-30" alt="youtube" />
  }

  if (!(classList.contains("dark")) || theme === "light") {
    return <img src={logoLight} className="mt-2 md:mt-3 lg:mt-3 w-30" alt="youtube" />
  }
}

const ThemeToggle = ({ handleThemeToggle, className }) => {
  const isDarkModeEnabled = document.documentElement.classList.contains("dark");
  let currentTheme = isDarkModeEnabled ? 'dark' : 'light';

  if (currentTheme === 'light') {
    return (
      <button className={className} onClick={handleThemeToggle}>
        <FontAwesomeIcon style={{ fontSize: '17px', color: 'black' }} className="mt-1 lg:mt-2" icon={faMoon} />
      </button>
    )
  }

  return (
    <button className={className} onClick={handleThemeToggle}>
      <FontAwesomeIcon style={{ fontSize: '18px', color: 'gold' }} className="mt-1 lg:mt-2" icon={faSun} />
    </button>
  )
}


const Header = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useContext(UserContext);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleSignIn = () => {
    setModalOpen(false);
    signInWithGoogle();
  }

  const handleSignOut = () => {
    setModalOpen(false);
    signOut();
  }

  const handleThemeToggle = () => {
    const isDarkModeEnabled = document.documentElement.classList.contains("dark");
    if (isDarkModeEnabled) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      changeTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      changeTheme("dark");
    }
  }


  const changeTheme = (theme: string) => {
    setTheme(theme);
  }

  const openSearch = () => {
    setOpen(!isOpen);
  }

  const closeSearch = () => {
    setOpen(false);
  }

  const handleMenuClick = () => {
    if (props.handleMenu) {
      props.handleMenu();
    }
    return;
  }

  return (
    <>
      <header className="transition-colors dark:bg-dark flex ml-2 items-center mr-2 lg:ml-0 lg:mr-0 pt-1">

        <div className="flex">
          <button onClick={handleMenuClick} className={props.sidebar ? "lg:mt-3 hidden lg:block mr-4 dark:focus:outline-white focus:outline-black" : "hidden"}>
            <FontAwesomeIcon style={{ fontSize: '18px' }} icon={faBars} />
          </button>
          <Link to="/">
            <Logo theme={theme} />
          </Link>
        </div>
        <div className="flex justify-end lg:justify-between w-full md:w-full md:mt-1">
          <div className="hidden lg:block lg:ml-24 lg:mt-1">
            <input style={{ width: '460px', paddingTop: '5px', paddingBottom: '5px' }} className="dark:bg-dark2 text-sm -mt-2 md:-mt-0 shadow-md placeholder-gray dark:placeholder-white dark:text-white bg-lightGray pl-4 pr-9 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
            <button><FontAwesomeIcon className="dark:text-white text-black relative -left-8 text-sm" icon={faSearch} /></button>
          </div>
          <div className="md:-mt-0 lg:mt-0 lg:mr-4 flex align-middle items-center">
            <button onClick={openSearch} className="mt-1 md:mr-2 lg:hidden"><FontAwesomeIcon className="dark:text-lightGray text-gray" style={{ marginTop: '7px', fontSize: '16px' }} icon={faSearch} /></button>
            {user &&
              <Link to={`/channel/${user.uid}/videos`}>
                <FontAwesomeIcon style={{ fontSize: '17px' }} className="dark:text-lightGray hidden text-gray md:mr-2 md:mt-2 lg:mr-4 lg:mt-0" icon={faVideo} />
              </Link>
            }
            <ThemeToggle className="focus:outline-black ml-4 mt-1 mr-2 lg:-mt-1 lg:ml-3 lg:mr-4" handleThemeToggle={handleThemeToggle} />
            <Profile handleSignIn={handleSignIn} handleModal={handleModal} user={user} />
          </div>
        </div>
      </header>
      <div className={modalOpen ? "dark:bg-dark2 bg-lightGray rounded-md p-2 space-y-3 absolute right-4 mt-3 lg:right-8 z-40 w-52 opacity-100 transition-opacity" : "hidden opacity-0"}>
        {user && <button className="space-x-2 flex items-center justify-center hover:opacity-70 w-full font-bold">
          <Link to={`/channel/${user.uid}`}>
            <span>Your Channel</span> <FontAwesomeIcon icon={faUserAlt} />
          </Link>
        </button>}
        {user && <button onClick={handleSignIn} className="space-x-2 flex items-center justify-center hover:opacity-70 w-full font-bold">
          <span>Switch Account</span> <FontAwesomeIcon icon={faExchangeAlt} />
        </button>}
        <button onClick={handleSignOut} className="space-x-2 hover:opacity-70 w-full font-bold">
          <span>Sign out</span> <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
      <MobileSearch open={isOpen} handleClose={closeSearch} />
    </>
  )
}


const MobileSearch = ({ open, handleClose }) => {
  return (
    <div className={open ? "dark:bg-dark text-center w-full top-0 fixed bg-white z-50 mt-1 pb-2 pt-2 pl-2 pr-4 flex lg:hidden" : 'hidden'}>
      <button onClick={handleClose} className="mr-2 md:mr-3 ml-0"><FontAwesomeIcon size="1x" className="dark:text-white text-gray" icon={faArrowLeft} /></button>
      <input style={{ width: '97%' }} className="dark:bg-dark2 bg-lightGray ml-0 pt-1 pb-1 pl-4 pr-4 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
      <button><FontAwesomeIcon className="dark:text-white text-black relative -left-8" icon={faSearch} size="1x" /></button>
    </div>
  )
}


export default Header;
//TODO: Add notifications feature later...