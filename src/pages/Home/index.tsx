import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import channelImg from '../../images/Oval.png';
import videoCover from '../../images/Cover.jpg';
import './index.css';


const Home = () => {
  const [navOpen, setNavOpen] = useState(true);

  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  return (
    <>
      <div className="dark:bg-dark md:pt-1 ml-2 mr-2 lg:mr-4 lg:ml-4">
        <Header handleMenu={handleSideBar} />
        <div className="flex mt-20 lg:mt-8 lg:space-x-14 xl:space-x-20">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar transition-transform'}>
            <SideBar />
          </div>
          <main className="lg:mt-8 w-full flex flex-col space-y-16">
            <section>
              <div>
                <div className="text-center justify-center lg:justify-start flex flex-row mb-8 ml-5 lg:ml-1  items-center space-x-2">
                  <img src={channelImg} className="w-10 lg:w-12 lg:mr-3" alt="channel" />
                  <h2 className="font-bold text-xl lg:text-3xl">Dollie Blair</h2>
                </div>
                <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
                  <Video />
                  <Video />
                  <Video />
                  <Video />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-center lg:text-left font-bold text-2xl lg:text-3xl ml-6 lg:ml-2  mb-8">Trending &#128293;</h2>
              <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            </section>

            <section>
              <h2 className="font-bold text-center lg:text-left text-2xl lg:text-3xl ml-6 lg:ml-2  mb-8">Most Viewed &#128065;</h2>
              <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            </section>

            <section>
              <h2 className="text-center lg:text-left font-bold text-2xl lg:text-3xl ml-6 lg:ml-2 mb-8">Most Liked &#128077;</h2>
              <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
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
  <div className="video">
    <Link to="/watch?v=122">
      <div className="text-right static">
        <img src={videoCover} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
        <span className="relative right-3 bottom-8 bg-gray opacity-80 text-white pl-2 pr-2 rounded-xl">4:15</span>
      </div>
    </Link>
    <div className="ml-2 mr-2">
      <h3 className="font-bold capitalize -mt-4">A brief history of Creation</h3>
      <div className="dark:text-lightGray text-gray text-xs flex justify-between">
        <div className="space-x-2">
          <span>80k views</span>
          <span>&middot;</span>
          <span>3 days ago</span>
        </div>
        <div><span>Dollie Blair</span></div>
      </div>
    </div>
  </div>
);


export default Home;
