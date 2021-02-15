import React from 'react';
import { Link } from 'react-router-dom';
import videoCover from '../images/Cover.png';


const Video = () => (
  <div style={{ width: '220px' }}>
    <Link to="/watch?v=122">
      <div className="text-right">
        <img src={videoCover} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
        <span className="relative right-3 bottom-8 bg-gray opacity-80 text-white pl-2 pr-2 rounded-xl">4:15</span>
      </div>
    </Link>
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
)


export default Video; 