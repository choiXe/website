import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SectorMenu from '../sector/SectorMenu';
import StockMarket from './StockMarket';
import Favorites from './Favorites';
import Trending from './Trending';

import data from '../../services/data';

import './Home.scss';

const Home = () => {
  const { t } = useTranslation();
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    document.title = 'choiXe :: ' + t('Home.tabTitle');
    data.getMainInfo('').then((data) => setMainData(data.getMainInfo));
  }, [t]);

  return (
    <div id="home">
      <div className="menu">
        <SectorMenu selected="" />
      </div>
      <div id="stock-market">
        <StockMarket data={mainData} />
      </div>
      <div id="favorites">
        <Favorites />
      </div>
      <div id="trending">
        <Trending data={mainData} />
      </div>
    </div>
  );
};

export default Home;
