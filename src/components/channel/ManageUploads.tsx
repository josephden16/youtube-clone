import ManageVideo from "./ManageVideo";

export default function ManageUploads({
  videos,
  updateCurrentVideo,
  openDeleteModal,
  channelId,
}) {
  return (
    <div>
      <h2 className="hidden lg:block mb-4 font-bold text-2xl">
        Uploads &#127909;
      </h2>
      <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
        {videos &&
          videos.map((video: any, index: number) => (
            <ManageVideo
              openDeleteModal={openDeleteModal}
              key={index}
              video={video}
              updateCurrentVideo={updateCurrentVideo}
              channelId={channelId}
            />
          ))}
        {!videos && <div className="text-left">This channel has no videos</div>}
      </div>
    </div>
  );
}
