import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import Layout from "../../components/common/Layout";
import SearchResults from "../../components/search/SearchResults";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  // algolia related config
  const algoliaSearchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
  const index = algoliaSearchClient.initIndex("videos");

  let query = useQuery();
  const searchQuery = query.get("q");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      try {
        const searchResponseData: any = await index.search(searchQuery);
        setError("");
        setLoading(false);
        setSearchResults(null);
        const { hits } = searchResponseData;
        if (hits && hits.length > 0) {
          setSearchResults(hits);
        } else {
          setSearchResults([]);
        }
      } catch {
        setLoading(false);
        setError("Failed to retrieve search results");
      }
    }

    fetchSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);


  return (
    <Layout>
      <div className="lg:mt-8 lg:-ml-4 xl:-ml-5 w-full block space-y-16">
        <SearchResults loading={loading} error={error} searchResults={searchResults} />
      </div>
    </Layout>
  )
}


export default Search;
