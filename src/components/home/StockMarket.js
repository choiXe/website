import React from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import { numSeperator } from '../tools/formatter';

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

  const marketInfo = (index) => {
    const color = index.changeRate >= 0 ? '#e21414' : '#246ded';
    return (
      <>
        <p style={{ color: color }}>
          {numSeperator(index.tradePrice)}
        </p>
        <p style={{ color: color }}>
          {index.changePrice > 0 ? '+' + index.changePrice : index.changePrice}
        </p>
        <p style={{ color: color }}>
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
    )
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
                  <img src={korea} alt="kr" />{' '}
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
            <div>
              <p className="market-title">
                <img src={us} alt="us" /> {t('Home.StockMarket.dow')}
              </p>
              {marketInfo(globalIndicator['다우 산업'])}
            </div>
            <div>
              <p className="market-title">
                <img src={us} alt="us" /> {t('Home.StockMarket.nasdaq')}
              </p>
              {marketInfo(globalIndicator['나스닥 종합'])}
            </div>
            <div>
              <p className="market-title">
                <img src={us} alt="us" /> S&P 500
              </p>
              {marketInfo(globalIndicator['S&P 500'])}
            </div>
            <div>
              <p className="market-title">
                <img src={china} alt="cn" /> {t('Home.StockMarket.shanghai')}
              </p>
              {marketInfo(globalIndicator['상해 종합'])}
            </div>
            <div>
              <p className="market-title">
                <img src={japan} alt="jp" /> {t('Home.StockMarket.nikkei')}
              </p>
              {marketInfo(globalIndicator['니케이 225'])}
            </div>
            <div>
              <p className="market-title">
                <img src={hongkong} alt="hk" /> HSI
              </p>
              {marketInfo(globalIndicator['HSI'])}
            </div>
            <div>
              <p className="market-title">
                <img src={germany} alt="gr" /> DAX
              </p>
              {marketInfo(globalIndicator['DAX'])}
            </div>
            <div>
              <p className="market-title">
                <img src={uk} alt="uk" /> FTSE 100
              </p>
              {marketInfo(globalIndicator['FTSE 100'])}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default StockMarket;
