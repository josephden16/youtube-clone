import Layout from "../../components/common/Layout";
import Videos from "../../components/home/Videos";
import { useHomePageVideos } from "../../api/hooks/videos";
import "./home.css";


const Home = () => {
  const { videos, loading, errorMessage, retry } = useHomePageVideos();

  return (
    <Layout>
      <div className="px-1 mt-6 lg:mt-8 lg:-ml-4 xl:-ml-5 w-full h-full flex flex-col justify-center space-y-16">
        <Videos videos={videos} loading={loading} error={errorMessage} retry={retry} />
      </div>
    </Layout>
  );
};

export default Home;
