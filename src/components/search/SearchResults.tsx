import Video from "../common/Video";
import VideoLoadingSkeleton from "../loading/VideoLoadingSkeleton";

const SearchResults = ({ loading, error, searchResults }) => {
  if (searchResults && searchResults.length > 0) {
    return (
      <div className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full">
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((video: any, index: number) => (
            <Video video={video} key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="mt-3">
      {loading && (
        <div className="mt-10 flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 w-full">
          <VideoLoadingSkeleton amount={20} />
        </div>
      )}
      {error && <div className="text-center">{error}</div>}
      {searchResults &&
        searchResults.length > 0 &&
        searchResults.map((video: any, index: number) => (
          <Video video={video} key={index} />
        ))}
      {searchResults && searchResults.length === 0 && (
        <div className="text-center w-full my-20">
          No videos matched your search criteria
        </div>
      )}
    </div>
  );
};

export default SearchResults;
