import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/common/Layout";
import SearchResults from "../../components/search/SearchResults";
import { searchVideos } from "../../api/requests/videos";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  let query = useQuery();
  const searchQuery = query.get("q");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        const videos: any[] = await searchVideos(
          searchQuery.toLocaleLowerCase()
        );
        setError("");
        setLoading(false);
        setSearchResults(null);
        if (videos.length > 0) {
          setSearchResults(videos);
        } else {
          setSearchResults([]);
        }
      } catch {
        setLoading(false);
        setError("Failed to retrieve search results");
      }
    };

    fetchSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Layout>
      <div className="mt-6 sm:mx-2 lg:mx-0 lg:ml-16 xl:ml-0 w-full block space-y-16">
        <SearchResults
          loading={loading}
          error={error}
          searchResults={searchResults}
        />
      </div>
    </Layout>
  );
};

export default Search;
