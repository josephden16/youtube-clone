import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faMoon, faSearch, faSun, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import logoLight from '../images/logo-light.svg';
import logoDark from '../images/logo-dark.svg';
import { UserContext } from './providers/AuthProvider';



const Profile = ({ user }) => {
  if (user) {
    return <img className="rounded-circle ml-2 mt-1 lg:-mt-1" style={{ width: '33px', height: '33px' }} src={user.photoURL} alt="profile" />
  }
  return (
    <button style={{outline: 'none'}} onClick={signInWithGoogle} className="focus:text-opacity-60 space-x-1 pb-1 pt-1 flex items-center outline-none border-1 rounded-sm border-red dark:border-lightGray ml-1 mt-1 lg:mb-1">
      <FontAwesomeIcon icon={faUser} className="text-red  dark:text-lightGray ml-1 lg:mt-0" style={{ fontSize: '15px' }} />
      <span className="pr-1 text-xs dark:text-lightGray text-red">SIGN IN</span>
    </button>
  )
}

const Logo = ({ theme }) => {
  let classList = document.documentElement.classList;

  if (classList.contains("dark") || theme === "dark") {
    return <img src={logoDark} className="mt-2 md:mt-3 lg:mt-3 w-28" alt="youtube" />
  }

  if (!(classList.contains("dark")) || theme === "light") {
    return <img src={logoLight} className="mt-2 md:mt-3 lg:mt-3 w-28" alt="youtube" />
  }
}

const ThemeToggle = ({ handleThemeToggle, className }) => {
  const isDarkModeEnabled = document.documentElement.classList.contains("dark");
  let currentTheme = isDarkModeEnabled ? 'dark' : 'light';

  if (currentTheme === 'light') {
    return (
      <button style={{ outline: 'none' }} className={className} onClick={handleThemeToggle}>
        <FontAwesomeIcon style={{ fontSize: '17px', color: 'black' }} className="mt-1 lg:mt-2" icon={faMoon} />
      </button>
    )
  }

  return (
    <button style={{ outline: 'none' }} className={className} onClick={handleThemeToggle}>
      <FontAwesomeIcon style={{ fontSize: '18px', color: 'gold' }} className="mt-1 lg:mt-2" icon={faSun} />
    </button>
  )
}


const Header = (props: any) => {
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const user = useContext(UserContext);

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
          <button style={{ outline: 'none' }} onClick={handleMenuClick} className={props.sidebar ? "lg:mt-3 hidden lg:block mr-4 outline-none" : "hidden"}>
            <FontAwesomeIcon style={{ fontSize: '18px' }} icon={faBars} />
          </button>
          <Link to="/">
            <Logo theme={theme} />
          </Link>
        </div>
        <div className="flex justify-end lg:justify-between w-full md:w-full md:mt-1">
          <div className="hidden lg:block lg:ml-32 lg:mt-1">
            <input style={{ width: '460px', paddingTop: '4px', paddingBottom: '4px' }} className="dark:bg-dark2 -mt-2 md:-mt-0 shadow-md dark:text-white bg-lightGray pl-4 pr-9 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
            <button><FontAwesomeIcon className="dark:text-white text-black relative -left-8" icon={faSearch} /></button>
          </div>
          <div className="md:-mt-0 lg:mt-0 lg:mr-4 flex align-middle items-center">
            <button onClick={openSearch} className="mt-1 md:mr-4 lg:hidden"><FontAwesomeIcon className="dark:text-lightGray text-gray" style={{ marginTop: '7px', fontSize: '16px' }} icon={faSearch} /></button>
            <FontAwesomeIcon style={{ fontSize: '17px' }} className="dark:text-lightGray hidden md:block text-gray md:mr-2 md:mt-2 lg:mr-4 lg:mt-0" icon={faVideo} />
            <ThemeToggle className="ml-4 mt-1 mr-2 lg:-mt-1 lg:ml-3 lg:mr-4" handleThemeToggle={handleThemeToggle} />
            <Profile user={user} />
          </div>
        </div>
      </header>
      <MobileSearch open={isOpen} handleClose={closeSearch} />
    </>
  )
}


const MobileSearch = ({ open, handleClose }) => {
  return (
    <div className={open ? "dark:bg-dark text-center w-full top-0 fixed bg-white z-50 mt-1 pb-2 pt-2 pl-2 pr-4 flex lg:hidden" : 'hidden'}>
      <button onClick={handleClose} className="mr-4 ml-2"><FontAwesomeIcon size="1x" className="dark:text-white text-gray" icon={faArrowLeft} /></button>
      <input style={{width: '97%'}} className="dark:bg-dark2 bg-lightGray ml-0 pt-1 pb-1 pl-4 pr-4 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
      <button><FontAwesomeIcon className="dark:text-white text-black relative -left-8" icon={faSearch} size="1x" /></button>
    </div>
  )
}


export default Header;
//TODO: Add notifications feature later...