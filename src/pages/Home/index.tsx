import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { VideosContext } from '../../components/providers/VideosProvider';
import { formatVideoTime, formatTime, formatChannelName, formatTitle } from '../../utils';
import Layout from '../../components/Layout';
import './home.css';


const Home = () => {
  const videos = useContext(VideosContext);

  if (!videos) return null;

  return (
    <Layout>
      <div className="lg:mt-8 lg:-ml-4 w-full flex flex-col space-y-16">
        <section>
          <div>
            <div className="grid grid-cols-1 w-full space-y-12 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
              {videos && videos.map(video => (
                <Video key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const Video = ({ video }) => {
  let time: string = "some time ago";

  if (video.timeUploaded) {
    time = formatTime(video.timeUploaded.seconds);
  }

  return (
    <div className="video-home">
      <Link to={`/watch?v=${video.id}`}>
        <div className="poster text-right static">
          <img loading="lazy" src={video.posterURL} width="500" height="200px" style={{ width: '100%' }} alt="cover" className="rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </Link>
      <div className="ml-2 mr-2">
        <h3 className="font-bold text-sm capitalize -mt-4">{formatTitle(video.title)}</h3>
        <div className="dark:text-lightGray text-dark text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="text-sm font-bold hover:text-gray">{formatChannelName(video.channelName)}</Link></div>
        </div>
      </div>
    </div>
  )
};


export default Home;
