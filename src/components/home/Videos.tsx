import Video from "../common/Video";
import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";
import ErrorImage from "../../images/error.png";

const Videos = ({ videos, loading, error, retry }) => {

  if (Array.isArray(videos) && videos.length > 0) {
    return (
      <>
        <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full lg:ml-3">
          {videos &&
            videos.map((video) => <Video key={video.id} video={video} />)}
        </section>
      </>
    );
  }

  if (loading) {
    return (
      <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full lg:ml-3">
        <VideoLoadingSkeleton amount={20} />
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center flex flex-col w-full h-full my-auto justify-center items-center">
        <div>
          <img
            draggable={false}
            src={ErrorImage}
            alt="error"
            className="w-20"
          />
        </div>
        <div className="font-semibold">
          Failed to fetch videos
        </div>
        <button
          style={{ outline: "0px" }}
          onClick={retry}
          className="font-semibold py-2 px-3 mt-6 transition-all duration-300 focus:bg-dark2 focus:text-white outline-none rounded-md"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="text-center flex flex-col w-full h-full my-auto justify-center items-center">
      <div>
        <img draggable={false} src={ErrorImage} alt="error" className="w-20" />
      </div>
      <div className="font-semibold text-dark dark:text-lightGray">Failed to fetch videos</div>
      <button
        style={{ outline: "0px" }}
        onClick={retry}
        className="font-semibold py-2 px-3 mt-6 transition-all duration-300 focus:bg-dark2 focus:text-white outline-none rounded-md"
      >
        RETRY
      </button>
    </div>
  );
};

export default Videos;
