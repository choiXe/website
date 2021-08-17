import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PWAPrompt from 'react-ios-pwa-prompt';

import SectorMenu from '../sector/SectorMenu';
import MarketIndex from './MarketIndex';
import Favorites from './Favorites';
import Trending from './Trending';

import data from '../../services/data';

import './Home.scss';

const Home = () => {
  const [mainData, setMainData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'choiXe :: ' + t('Home.tabTitle');
    data.getMainInfo('').then((data) => setMainData(data.getMainInfo));
  }, [t]);

  return (
    <div id="home">
      <PWAPrompt
        promptOnVisit={10}
        timesToShow={1}
        delay={1500}
        copyTitle={t('PWA.title')}
        copyBody={t('PWA.body')}
        copyShareButtonLabel={t('PWA.share')}
        copyAddHomeButtonLabel={t('PWA.add')}
        copyClosePrompt={t('PWA.close')}
      />
      <section className="sector-menu">
        <SectorMenu selected="" />
      </section>
      <section id="market-index">
        <MarketIndex data={mainData} />
      </section>
      <section id="favorites">
        <Favorites />
      </section>
      <section id="trending">
        <Trending data={mainData} />
      </section>
    </div>
  );
};

export default Home;
