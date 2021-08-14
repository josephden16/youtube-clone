import React, { useState } from 'react'
import Header from '../navigation/Header';
import SideBar from '../navigation/SideBar';
import MobileFooter from '../navigation/MobileFooter';


const Layout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);

  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  return (
    <>
      <div className="dark:bg-dark transition-colors duration-500 h-full md:pt-0 pl-2 pr-2 pb-20 lg:pr-4 lg:pl-4">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex w-full pt-10 lg:pt-8 md:space-x-8 lg:space-x-11 xl:space-x-14">
          <div className={navOpen ? 'openSidebar lg:mr-16' : 'hideSidebar lg:mr-0'}>
            <SideBar />
          </div>
          <main className="w-full">{children}</main>
        </div>
      </div>
      <MobileFooter />
    </>
  )
}


export default Layout;
