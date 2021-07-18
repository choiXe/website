import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import Loader from 'react-loader-spinner';

import SectorMenu from '../sector/SectorMenu';
import StockMarket from './StockMarket';
import Favorites from './Favorites';
import Trending from './Trending';

import data from '../../services/data';

import './Home.scss';

const Home = () => {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    document.title = 'choiXe :: 투자가 처음이야?';
    data.getMainInfo('').then((data) => setMainData(data.getMainInfo));
  }, []);

  if (!mainData) {
    return (
      <div id="home">
        <Sticky top={20} bottomBoundary="#trending-list" innerClass="menu">
          <SectorMenu selected="" />
        </Sticky>
        <div id="stock-market">
          <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
        </div>
        <div id="favorites">
          <Favorites />
        </div>
        <div id="trending">
          <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="home">
        <Sticky top={20} bottomBoundary="#trending-list" innerClass="menu">
          <SectorMenu selected="" />
        </Sticky>
        <div id="stock-market">
          <StockMarket data={mainData} />
        </div>
        <div id="favorites">
          <Favorites />
        </div>
        <div id="trending">
          <Trending trendingList={mainData.reports} />
        </div>
      </div>
    );
  }
};

export default Home;
