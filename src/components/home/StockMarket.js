import React from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import { numSeperator, calColor } from '../tools/formatter';

import './StockMarket.scss';

import china from '../../images/flag/china.png';
import germany from '../../images/flag/germany.png';
import hongkong from '../../images/flag/hongkong.png';
import japan from '../../images/flag/japan.png';
import korea from '../../images/flag/korea.png';
import uk from '../../images/flag/uk.png';
import us from '../../images/flag/us.png';

const StockMarket = ({ data }) => {
  const { t } = useTranslation();
  const globalOrder = [
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

  const marketInfo = (index) => {
    const color = calColor(index.changeRate, 0);
    return (
      <>
        <p style={color}>{numSeperator(index.tradePrice)}</p>
        <p style={color}>
          {index.changePrice > 0 ? '+' + index.changePrice : index.changePrice}
        </p>
        <p style={color}>
          {index.changeRate > 0 ? '+' + index.changeRate : index.changeRate}%
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
    let globalIndicator = {};
    for (let i = 0; i < data.global.length; i++) {
      globalIndicator[data.global[i].name] = data.global[i];
    }

    return (
      <>
        <div className="index korea">
          <h4>{t('Home.StockMarket.domestic')}</h4>
          <div id="market-title">
            <div></div>
            <div>{t('Home.StockMarket.price')}</div>
            <div>{t('Home.StockMarket.change')}</div>
            <div>{t('Home.StockMarket.changePercent')}</div>
          </div>
          <div className="market-table">
            {data.kr.map((index) => (
              <div key={index.name}>
                <p className="market-title">
                  <img src={korea} alt="flag" />
                  {t('Home.StockMarket.' + index.name)}
                </p>
                {marketInfo(index)}
              </div>
            ))}
          </div>
        </div>
        <div className="index global">
          <h4>{t('Home.StockMarket.global')}</h4>
          <div className="market-table">
            {globalOrder.map((item, index) => (
              <div key={index}>
                <p className="market-title">
                  <img src={item.src} alt="flag" /> {item.name}
                </p>
                {marketInfo(globalIndicator[item.key])}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default StockMarket;
