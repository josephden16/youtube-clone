import Video from "../common/Video"
import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";


const Videos = ({ videos, loading, error }) => {
  const numberOfLoadingSkeletons = 20;
  const loadingSkeletonArray = Array(numberOfLoadingSkeletons).fill(null).map((_, index) => index);

  if (videos) {
    return (
      <>
        <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full">
          {videos && videos.map(video => (
            <Video key={video.id} video={video} />
          ))}
        </section>
      </>
    )
  }

  if (loading) {
    return (
      <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full">
        {loadingSkeletonArray && loadingSkeletonArray.map((item: number) => (
          <VideoLoadingSkeleton key={item} />
        ))}
      </section>
    )
  }

  if (error) {
    return <div className="text-center w-full">Failed to fetch videos</div>
  }

  return <div className="text-center w-full">Failed to fetch videos</div>
}

export default Videos;
