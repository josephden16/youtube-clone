import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faBell, faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
import profileImg from '../images/profile.jpg';
import logoLight from '../images/logo-light.svg';


const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const openSearch = () => {
    setOpen(!isOpen);
  }

  const closeSearch = () => {
    setOpen(false);
  }

  return (
    <>
      <header className="flex ml-2 mr-2 lg:ml-0 lg:mr-0 mt-2">

        <div className="flex">
          <button className="hidden lg:block mr-4 outline-none">
            <FontAwesomeIcon size="lg" className="mt-2" icon={faBars} />
          </button>
          <Link to="/"><img src={logoLight} className="mt-3" style={{width: '120px'}} alt="youtube" /></Link>
        </div>

        <div className="flex justify-end w-full md:justify-between md:w-full md:mt-1">
          <div className="hidden md:block md:ml-20 lg:ml-32">
            <input style={{ width: '440px' }} className="bg-lightGray pt-2 pb-2 pl-4 pr-9 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
            <button><FontAwesomeIcon className="text-black relative -left-8" icon={faSearch} /></button>
          </div>
          <div className="flex align-middle">
            <FontAwesomeIcon size="lg" className="hidden md:block text-gray md:mr-2 md:mt-2 lg:mr-6 lg:mt-2" icon={faVideo} />
            <FontAwesomeIcon size="lg" className="hidden md:block text-gray md:mr-2 md:ml-3 md:mt-2 lg:mr-6 lg:mt-2" icon={faBell} />
            <button onClick={openSearch} className="md:hidden"><FontAwesomeIcon style={{ marginTop: '7px', fontSize: '18px' }} icon={faSearch} /></button>
            <img className="rounded-circle ml-2" style={{ width: '35px', height: '35px' }} src={profileImg} alt="profile" />
          </div>
        </div>
      </header>
      <MobileSearch open={isOpen} handleClose={closeSearch} />
    </>
  )
}


const MobileSearch = ({ open, handleClose }) => {
  return (
    <div className={open ? "text-center w-full top-0 fixed bg-white z-50 pb-2 pt-4 pl-2 pr-4 flex lg:hidden" : 'hidden'}>
      <button onClick={handleClose} className="mr-4"><FontAwesomeIcon size="lg" className="text-gray" icon={faArrowLeft} /></button>
      <input className="bg-lightGray w-11/12 pt-2 pb-2 pl-4 pr-4 rounded-3xl outline-none" type="search" name="search" placeholder="Search" title="search" />
      <button><FontAwesomeIcon className="text-black relative -left-8" icon={faSearch} /></button>
    </div>
  )
}


export default Header;
