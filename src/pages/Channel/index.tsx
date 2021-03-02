import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import ChannelOwner from '../../images/channel-owner.png';
import defaultPoster from '../../images/default.png';
import './index.css';


const Channel = () => {
  const [navOpen, setNavOpen] = useState(true);

  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }
  return (
    <>
      <div className="dark:bg-dark h-full md:pt-1 ml-2 mr-2 pb-20 lg:mr-4 lg:ml-4 transition-all duration-300">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex mt-10 lg:mt-8 md:space-x-8 lg:space-x-6 xl:space-x-16">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar transition-transform'}>
            <SideBar />
          </div>
          <main className="lg:mt-4 w-full flex flex-col space-y-16">

            <section className="flex flex-col md:flex-row md:justify-between space-y-3 ml-1 lg:ml-0 md:mr-3">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 lg:space-x-6">
                <div>
                  <img className="w-20 lg:w-auto" src={ChannelOwner} alt="channel owner" />
                </div>
                <div>
                  <h2 className="font-bold lg:text-xl">Margaret Phelps</h2>
                  <div className="dark:text-lightGray">245k subscribed</div>
                </div>
              </div>
              <div>
                {/* <button>
                  <FontAwesomeIcon icon={faBell} />
                </button> */}
                <button className="bg-red rounded-3xl pb-2 pt-2 pl-3 pr-3 text-white">Subscribe 2.3m</button>
              </div>
            </section>

            <section className="ml-2 lg:ml-0 overflow-scroll no-scrollbar">
              <ul className="flex flex-row m-0 p-0 space-x-6 lg:space-x-12 items-center text-sm lg:text-base dark:text-lightGray dark:border-dark">
                <li className="dark:hover:border-red dark:hover:text-red  text-red border-red hover:border-red transition-all pb-1 border-b-2">
                  <Link to="#">
                    Home
                  </Link>
                </li>
                <li className="dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2">
                  <Link to="#">
                    Videos
                  </Link>
                </li>
                <li className="dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2">
                  <Link to="#">
                    Playlists
                  </Link>
                </li>
                <li className="dark:hover:border-red dark:hover:text-red hover:text-red hover:border-red transition-all pb-1 border-white dark:border-dark border-b-2">
                  <Link to="#">
                    About
                  </Link>
                </li>
                <li className="flex items-center mb-1 lg:block space-x-4">
                  <button className="outline-none"><FontAwesomeIcon icon={faSearch} /></button>
                  <input className="dark:bg-dark dark:text-lightGray border-b-2 outline-none dark:border-lightGray" type="search" placeholder="Search channel..." />
                </li>
              </ul>
            </section>

            <section>
              <h2 className="hidden lg:block mb-4 font-bold text-2xl">Margaret Phelps videos</h2>
              <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
                <Video />
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            </section>
          </main>
        </div>
      </div>
      <MobileFooter />
    </>
  )
}

const Video = () => (
  <div className="lg:w-60 xl:w-64">
    <Link to={"#"}>
      <div className="poster text-right static">
        <img loading="lazy" src={defaultPoster} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
        <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">0:12</span>
      </div>
    </Link>
    <div className="ml-2 mr-2">
      <h3 className="font-bold text-sm capitalize -mt-4">Random Video</h3>
      <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
        <div className="space-x-2 text-sm">
          <span>23k views</span>
          <span>&middot;</span>
          <span>2 days ago</span>
        </div>
        <div><span className="text-sm">Joseph</span></div>
      </div>
    </div>
  </div>
)

export default Channel;
