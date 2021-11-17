import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

export default function RelatedVideosSkeleton() {
  return (
    <div className="ml-3 mr-3 lg:m-0">
      <div
        style={{ alignItems: "center" }}
        className="video flex flex-row justify-between"
      ></div>
      <div className="flex flex-col space-y-6">
        <VideoLoadingSkeleton amount={6} />
      </div>
    </div>
  );
}
