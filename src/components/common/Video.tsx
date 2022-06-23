import React from "react";
import { Link } from "react-router-dom";
import {
  formatChannelName,
  formatTitle,
  formatVideoTime,
  formatTime,
} from "../../utils";

const Video = ({ video }) => {
  let time: string = "some time ago";

  if (video?.timeUploaded) {
    time = formatTime(video.timeUploaded.seconds);
  }

  if (!video) return null;

  return (
    <div className="video-home flex flex-col space-y-5">
      <div>
        <Link to={`/watch?v=${video.id}`}>
          <div className="text-right w-full h-44 sm:h-32 lg:h-32">
            <img
              loading="lazy"
              src={video.posterURL}
              width="500px"
              height="200px"
              style={{ width: "inherit", height: "inherit" }}
              alt={video.title}
              className="text-center rounded-2xl hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            />
            <span className="relative right-3 bottom-8 bg-dark bg-opacity-40 text-white text-xs pt-1 pb-1 pl-2 pr-2 rounded-xl">
              {formatVideoTime(parseInt(video.duration, 10))}
            </span>
          </div>
        </Link>
      </div>
      <div className="ml-2 mr-2">
        <h3 className="font-bold text-sm capitalize -mt-4">
          {formatTitle(video.title)}
        </h3>
        <div className="dark:text-lightGray text-black text-xs lg:text-sm flex justify-between">
          <div className="space-x-2 text-sm">
            <span>{video.views} views</span>
            <span>&middot;</span>
            <span>{time}</span>
          </div>
          <div>
            <Link
              to={`/channel/${video.channelId}`}
              className="text-sm font-bold hover:text-gray"
            >
              {formatChannelName(video.channelName)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
