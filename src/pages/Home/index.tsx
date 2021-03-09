import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import { VideosContext } from '../../components/providers/VideosProvider';
import { formatVideoTime, formatTime } from '../../utils';
import './index.css';


const Home = () => {
  const videos = useContext(VideosContext);
  const [navOpen, setNavOpen] = useState(true);

  const handleSideBar = () => {
    setNavOpen(!navOpen);
  }

  if (!videos) return null;

  return (
    <>
      <div className="dark:bg-dark h-full md:pt-0 ml-2 mr-2 pb-20 lg:mr-4 lg:ml-4">
        <Header sidebar={true} handleMenu={handleSideBar} />
        <div className="flex mt-16 lg:mt-8 lg:space-x-12 xl:space-x-16">
          <div className={navOpen ? 'transition-transform lg:mr-16' : 'hideSidebar transition-transform'}>
            <SideBar />
          </div>
          <main className="lg:mt-8 w-full flex flex-col space-y-16">
            <section>
              <div>
                {/* <div className="text-center justify-center lg:justify-start flex flex-row mb-8 ml-5 lg:ml-1  items-center space-x-2">
                  <img src={channelImg} className="w-10 lg:w-12 lg:mr-3" alt="channel" />
                   <h2 className="font-bold text-xl lg:text-3xl">Dollie Blair</h2>
                </div> */}
                {videos && <div className="text-center justify-center lg:justify-start flex flex-row mb-8 ml-5 lg:ml-1 items-center space-x-2">
                  <h2 className="font-bold text-3xl lg:text-3xl">Videos &#127909;</h2>
                </div>}
                <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
                  {videos && videos.map(video => (
                    <Video key={video.id} {...video} />
                  ))}
                </div>
              </div>
            </section>
            {/* <section>
              <h2 className="text-center lg:text-left font-bold text-2xl lg:text-3xl ml-6 lg:ml-2  mb-8">Trending &#128293;</h2>
              <div className="flex flex-col space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            </section>
           */}
          </main>
        </div>
      </div>
      <MobileFooter />
    </>
  )
}

const Video = (props: any) => {
  let time: string = "some time ago";

  if (props.timeUploaded) {
    time = formatTime(props.timeUploaded.seconds);
  }

  return (
    <div className="video-home">
      <Link to={`/watch?v=${props.id}`}>
        <div className="poster text-right static">
          <img loading="lazy" src={props.posterURL} style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(props.duration, 10))}</span>
        </div>
      </Link>
      <div className="ml-2 mr-2">
        <h3 className="font-bold text-sm capitalize -mt-4">{props.title}</h3>
        <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{props.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div><Link to={`/channel/${props.channelId}`} className="text-sm font-bold hover:text-gray">Joseph</Link></div>
        </div>
      </div>
    </div>
  )
};


export default Home;
