import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

export default function ChannelVideosSkeleton() {
  return (
    <section className="mx-2">
      <div>
        <h2 className="hidden lg:block mb-4 font-bold text-2xl">
          Uploads &#127909;
        </h2>
        <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:grid-cols-4 lg:space-y-0">
          <VideoLoadingSkeleton amount={12} />
        </div>
      </div>
    </section>
  )
}
