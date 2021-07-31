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
        promptOnVisit={3}
        timesToShow={2}
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
      <section id="ad">
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-4563731727729561"
          data-ad-slot="3773436628"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
      </section>
      <section id="trending">
        <Trending data={mainData} />
      </section>
    </div>
  );
};

export default Home;
