import { Link } from 'react-router-dom'
import { formatTime, formatVideoTime } from '../../utils';
import Video from '../common/Video';
import ChannelHomeSkeleton from './ChannelHomeSkeleton';


export default function Home({ channelData, videos, loading }) {
  
  let time: string = "some time ago";
  
  if (videos && videos[0].timeUploaded) {
    time = formatTime(videos[0].timeUploaded.seconds);
  }
  
  if (loading) return <ChannelHomeSkeleton />
  
  if (!(videos && channelData)) return null;

  return (
    <section>
      {videos &&
        <div className="mx-2">
          <div className="flex flex-col w-11/12 sm:w-96 mb-8">
            <Link to={`/watch?v=${videos[0].id}`}>
              <div className="text-right static">
                <img loading="lazy" src={videos[0].posterURL} alt={videos[0].title} className="w-full h-48 text-center rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
                <span className="relative right-3 bottom-8 bg-gray opacity-90 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(videos[0].duration, 10))}</span>
              </div>
              <div className="text-left ml-1 lg:ml-0">
                <h2 className="font-bold text-2xl lg:text-xl mb-3">{videos[0].title}</h2>
                <p className="dark:text-lightGray mb-3">
                  {videos[0].description}
                </p>
                <p className="dark:text-lightGray text-sm mb-3">
                  {videos[0].views} views  ·  {time}
                </p>
              </div>
            </Link>
          </div>

          <div>
            <h2 className="text-center sm:text-left lg:block ml-1 mb-6 font-bold text-2xl">{channelData.channelName}'s Videos &#127909;</h2>
            <div className="flex flex-col space-y-8 sm:grid sm:grid-cols-2 md:space-y-0 md:space-x-0 md:gap-8 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
              {videos && videos.map((video: any, index: number) => (
                <Video key={index} video={video} />
              ))}
            </div>
          </div>
        </div>}
      {
        !videos && <div className="text-left">This channel has no videos</div>
      }
    </section>
  )
}
