import Video from "../common/Video";
import LikedVideosSkeleton from "./LikedVideosSkeleton";

export default function LikedVideos({ likedVideos, loading }) {
  if (loading) return <LikedVideosSkeleton />;

  if (!likedVideos) return null;

  return (
    <section className="border-b-1 pb-5 border-lightGray dark:border-gray w-full">
      <div className="flex flex-row w-full justify-center lg:justify-between">
        <div className="flex flex-row w-full justify-center lg:justify-between sm:mb-10 mb-8">
          <div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl lg:text-2xl font-bold">
                &#128077; Liked Videos
              </div>
              <div className="text-base dark:text-lightGray mt-1">
                {likedVideos && likedVideos.length}
              </div>
            </div>
          </div>
          <div>
            {/* <button className="hidden font-bold lg:block uppercase">see all</button> */}
          </div>
        </div>
      </div>
      <div className="mx-1 flex flex-col space-y-8 sm:grid sm:space-y-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:space-y-0 xl:grid-cols-4">
        {likedVideos &&
          likedVideos.map((video: any, index: number) => (
            <Video key={index} video={video} />
          ))}
      </div>
      {/* <div className="text-center mt-4 text-lg lg:hidden"><button className="uppercase text-sm">see all</button></div> */}
    </section>
  );
}
