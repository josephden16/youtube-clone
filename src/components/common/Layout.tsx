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
      <div className="dark:bg-dark h-full md:pt-0 pl-0 pr-0 pb-20 lg:pr-4 lg:pl-4">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex w-full pt-0 lg:pt-4 md:space-x-8 lg:space-x-11 xl:space-x-1">
          <div className={navOpen ? 'openSidebar lg:mr-11 xl:w-56' : 'hideSidebar lg:mr-0'}>
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
