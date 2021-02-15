import React from 'react';
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import SideBar from '../../components/SideBar';
import Video from '../../components/Video';
import channelImg from '../../images/Oval.png';


const Home = () => {
  return (
    <div className="ml-2 mr-2 mt-2 mb-2 lg:mr-4 lg:ml-4">
      <Header />
      <div className="flex mt-10 lg:space-x-28">
        <SideBar />
        <main className="lg:mt-8 space-y-16">
          <section>
            <div>
              <div className="flex flex-row mb-8 items-center space-x-2">
                <img src={channelImg} alt="channel" />
                <h2 className="font-bold text-3xl">Dollie Blair</h2>
              </div>
              <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
                <Video />
                <Video />
                <Video />
                <Video />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-3xl mb-8">Trending &#128293;</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
              <Video />
              <Video />
              <Video />
              <Video />
            </div>
          </section>

          <section>
            <h2 className="font-bold text-3xl mb-8">Most Viewed &#128065;</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
              <Video />
              <Video />
              <Video />
              <Video />
            </div>
          </section>

          <section>
            <h2 className="font-bold text-3xl mb-8">Most Liked &#128077;</h2>
            <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-8">
              <Video />
              <Video />
              <Video />
              <Video />
            </div>
          </section>
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}

export default Home;
