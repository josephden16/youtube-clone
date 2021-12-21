import { Link } from "react-router-dom";
import { formatTitle, formatChannelName, formatTime, formatVideoTime } from "../../utils";


export default function Video({ video }) {
  let time: string = "some time ago";

  if (!video) return null;

  return (
    <div className="video">
      <a href={`/watch?v=${video.id}`}>
        <div className="text-right static">
          <img src={video.posterURL} style={{ width: '100%' }} width="500" height="200px" alt="cover" className="video-poster object-center rounded-3xl hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
          <span className="text-xs relative right-3 bottom-8 bg-gray  opacity-80 text-white pt-1 pb-1 pl-2 pr-2 rounded-xl">{formatVideoTime(parseInt(video.duration, 10))}</span>
        </div>
      </a>
      <div className="transition-colors ml-2 mr-2">
        <h3 className="font-bold capitalize text-sm -mt-4">{formatTitle(video.title)}</h3>
        <div className="text-black dark:text-lightGray text-xs flex justify-between">
          <div className="space-x-2">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{video.timeUploaded ? formatTime(video.timeUploaded.seconds) : time}</span>
          </div>
          <div><Link to={`/channel/${video.channelId}`} className="font-bold hover:text-gray">{formatChannelName(video.channelName)}</Link></div>
        </div>
      </div>
    </div>
  )
};
