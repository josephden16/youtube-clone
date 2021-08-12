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
      <div className="dark:bg-dark transition-colors duration-500 h-full md:pt-0 ml-2 mr-2 pb-20 lg:mr-4 lg:ml-4">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex w-full mt-10 lg:mt-8 md:space-x-8 lg:space-x-11 xl:space-x-14">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar lg:mr-0 transition-transform'}>
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