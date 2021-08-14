import Video from "../common/Video"


const Videos = ({ videos, loading }) => {
  if (videos) {
    return (
      <>
        {videos && videos.map(video => (
          <Video key={video.id} video={video} />
        ))}
      </>
    )
  } else if (loading) {
    return <div className="text-center w-full">Loading...</div>

  } else if (!videos && !loading) {
    return <div>Failed to fetch videos</div>
  } else {
    return <div>Failed to fetch videos</div>
  }
}

export default Videos;
