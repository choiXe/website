import React from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import './MarketIndex.scss';

import china from '../../images/flag/china.png';
import germany from '../../images/flag/germany.png';
import hongkong from '../../images/flag/hongkong.png';
import japan from '../../images/flag/japan.png';
import korea from '../../images/flag/korea.png';
import uk from '../../images/flag/uk.png';
import us from '../../images/flag/us.png';

const MarketIndex = ({ data }) => {
  const { t } = useTranslation();
  const globalIndices = [
    {
      src: us,
      name: t('Home.StockMarket.dow'),
      key: '다우 산업'
    },
    {
      src: us,
      name: t('Home.StockMarket.nasdaq'),
      key: '나스닥 종합'
    },
    {
      src: us,
      name: 'S&P 500',
      key: 'S&P 500'
    },
    {
      src: uk,
      name: 'FTSE 100',
      key: 'FTSE 100'
    },
    {
      src: germany,
      name: 'DAX',
      key: 'DAX'
    },
    {
      src: china,
      name: t('Home.StockMarket.shanghai'),
      key: '상해 종합'
    },
    {
      src: hongkong,
      name: 'HSI',
      key: 'HSI'
    },
    {
      src: japan,
      name: t('Home.StockMarket.nikkei'),
      key: '니케이 225'
    }
  ];

  const calColor = (x, y) => {
    if (x > y) {
      return { color: '#e21414' };
    } else if (x < y) {
      return { color: '#246ded' };
    }
    return { color: '#ffffff' };
  };

  const indexInfo = (index) => {
    const color = calColor(index.changeRate, 0);
    return (
      <>
        <p style={color}>{index.tradePrice}</p>
        <p style={color}>{index.changePrice}</p>
        <p style={color}>
          {index.changeRate > 0 ? '+' : ''}
          {index.changeRate}%
        </p>
      </>
    );
  };

  if (!data) {
    return (
      <div className="loader">
        <Loader
          type="MutatingDots"
          color="#BBD2C5"
          secondaryColor="#536976"
          height={100}
          width={100}
        />
      </div>
    );
  } else {
    const domesticIndices = data.kr;
    let globalIndexMapping = {};
    for (let i = 0; i < data.global.length; i++) {
      globalIndexMapping[data.global[i].name] = data.global[i];
    }

    return (
      <>
        <div className="index korea">
          <h4 className="section-titles">{t('Home.StockMarket.domestic')}</h4>
          <ul id="index-column-titles">
            <li>{t('Home.StockMarket.price')}</li>
            <li>{t('Home.StockMarket.change')}</li>
            <li>{t('Home.StockMarket.changePercent')}</li>
          </ul>
          <ul className="index-items">
            {domesticIndices.map((index) => (
              <li key={index.name}>
                <p className="index-name">
                  <img src={korea} alt="flag" />
                  {t('Home.StockMarket.' + index.name)}
                </p>
                {indexInfo(index)}
              </li>
            ))}
          </ul>
        </div>
        <div className="index global">
          <h4 className="section-titles">{t('Home.StockMarket.global')}</h4>
          <ul className="index-items">
            {globalIndices.map((index) => (
              <li key={index.name}>
                <p className="index-name">
                  <img src={index.src} alt="flag" />
                  {index.name}
                </p>
                {indexInfo(globalIndexMapping[index.key])}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default MarketIndex;
