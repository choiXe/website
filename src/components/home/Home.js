import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="home">
      <div className="menu">
        <SectorMenu selected="" />
      </div>
      <div id="stock-market">
        {!mainData
          ? <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
          : <StockMarket data={mainData} />
        }
      </div>
      <div id="favorites">
        {!mainData
          ? <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
          : <Favorites />
        }
      </div>
      <div id="trending">
        {!mainData
          ? <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
          : <Trending trendingList={mainData.reports} />
        }
      </div>
    </div>
  );
};

export default Home;
