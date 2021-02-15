import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import { faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import channelLogo from '../../images/channel-logo.png';
import videoCover from '../../images/Cover.png';
import MobileFooter from '../../components/MobileFooter';
import poster from '../../images/poster.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Watch = () => {
  let query = useQuery();
  let v = query.get("v");
  const [open, setOpen] = useState(false);

  const openDescription = () => {
    setOpen(!open);
  }

  return (
    <div className="lg:mr-4 lg:ml-4">
      <div className="hidden text-center">Video id: {v}</div>
      <div className="lg:pl-2 lg:pr-2">
        <Header />
      </div>
      <main className="layout mt-3 lg:mt-10 w-full">
        <div>
          <video className="videoPlayer" preload="none" controls poster={poster}>
            <source src='/videos/production ID 4475614.mp4' type='video/mp4' />
          </video>
          <div className="flex flex-col ml-4 mr-4 mt-3 mb-4 lg:mt-6 border-lightGray border-b-1 space-y-3">
            <h1 className="capitalize font-bold text-xl lg:text-3xl">dude you are getting a telescope</h1>
            <div className="lg:flex lg:flex-row lg:justify-between">
              <span className="text-sm text-gray lg:mt-4">123k views</span>
              <div className="text-gray flex flex-row mt-2 pb-6 space-x-2">
                <button className="bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsUp} /> 123k</button>
                <button className="bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faThumbsDown} /> 435k</button>
                <button className="bg-lightGray pl-4 pb-2 pt-2 text-sm pr-4 rounded-full"><FontAwesomeIcon icon={faShare} /> Share</button>
              </div>
            </div>
          </div>
          <div className="ml-4 mr-4 mt-3 mb-9 pb-3 border-lightGray border-b-1">
            <div>
              <div className="flex flex-row justify-between mb-2">
                <div className="flex flex-row space-x-2" style={{ alignItems: 'center' }}>
                  <img style={{ width: '60px' }} src={channelLogo} alt={'channel logo'} />
                  <div>
                    <h3 className="font-bold text-lg">Food and Drink</h3>
                    <span className="text-gray">245k subscribed</span>
                  </div>
                </div>
                <button className="text-red bg-white">Subscribe</button>
              </div>
            </div>
            <div className={open ? 'text-gray' : 'hideText'}>
              <p className="lg:ml-16">
                A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the consumer’s mood when they see your ad.
              </p>
            </div>
            <button onClick={openDescription} className="mt-2 outline-none uppercase text-gray font-bold">
              {open ? 'show less' : 'show more'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
        </div>
      </main>
      <MobileFooter />
    </div>
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
      <div className="text-gray text-xs flex justify-between">
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

export default Watch;
//TODO: Add Comments
