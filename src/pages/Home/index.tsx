import React, { useContext } from 'react';
import { VideosContext } from '../../components/providers/VideosProvider';
import Video from '../../components/common/Video';
import Layout from '../../components/common/Layout';
import './home.css';


const Home = () => {
  const videos = useContext(VideosContext);

  if (!videos) return null;

  return (
    <Layout>
      <div className="lg:mt-8 lg:-ml-4 xl:-ml-5 w-full block space-y-16">
        <section className="flex flex-wrap  space-y-12  sm:grid sm:space-y-0 sm:gap-5 sm:grid-cols-3  lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:space-y-0 lg:gap-8">
          {videos && videos.map(video => (
            <Video key={video.id} video={video} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default Home;
