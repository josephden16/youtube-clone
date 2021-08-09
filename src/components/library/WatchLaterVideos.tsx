import Video from "../watch/Video";


export default function WatchLaterVideos({ watchLaterVideos }) {
  if (!watchLaterVideos) return null;
  return (
    <section className="border-b-1 pb-2 border-lightGray dark:border-gray w-full">
      <div className="flex flex-row w-full justify-center lg:justify-between">
        <div className="flex flex-row w-full justify-center mb-8 sm:mb-10 lg:justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl lg:text-2xl font-bold">&#128337; Watch Later</div>
              <div className="text-base dark:text-lightGray mt-1">{watchLaterVideos && watchLaterVideos.length}</div>
            </div>
          </div>
          <div>
            {/* <button className="hidden font-bold lg:block uppercase">see all</button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
        {watchLaterVideos && watchLaterVideos.map((video: any, index: number) => (
          <Video key={index} video={video} />
        ))}
      </div>
      {/* <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div> */}
    </section>
  )
}
