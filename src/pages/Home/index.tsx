import React, { useContext } from 'react';
import { VideosContext } from '../../components/providers/VideosProvider';
import Layout from '../../components/common/Layout';
import Videos from '../../components/home/Videos';
import './home.css';


const Home = () => {
  const { videos, loading } = useContext(VideosContext);


  return (
    <Layout>
      <div className="lg:mt-8 lg:-ml-4 xl:-ml-5 w-full block space-y-16">
        <section className="flex flex-wrap space-y-12 sm:space-y-0 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
          <Videos videos={videos} loading={loading} />
        </section>
      </div>
    </Layout>
  )
}

export default Home;
