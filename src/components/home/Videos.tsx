import Video from "../common/Video"


const Videos = ({ videos, loading, error }) => {
  console.log(error);
  if (videos) {
    return (
      <>
        {videos && videos.map(video => (
          <Video key={video.id} video={video} />
        ))}
      </>
    )
  }

  if (loading) {
    return <div className="text-center w-full">Loading...</div>
  }

  if (error) {
    return <div className="text-center w-full">Failed to fetch videos</div>
  }

  return <div className="text-center w-full">Failed to fetch videos</div>
}

export default Videos;
