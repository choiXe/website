import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import { calColor, slicer } from '../tools/formatter';
import { reportUrl } from '../tools/constants';

import './Trending.scss';

const TrendingItem = ({ item }) => {
  return (
    <>
      <div id="mobile">
        <a href={reportUrl + item.reportIdx} rel="noreferrer" target="_blank">
          <h4>{slicer(item.reportName, 21)}</h4>
        </a>
        <div style={{display: 'flex'}}>
          <Link
            to={{
              pathname: '/stock',
              state: {
                stockId: item.stockId,
                stockName: item.stockName
              }
            }}
          >
            <h5>
              {item.stockName + ' | ' + item.date}
            </h5>
          </Link>
        </div>
      </div>
      <p id="date">{item.date}</p>
      <Link
        to={{
          pathname: '/stock',
          state: {
            stockId: item.stockId,
            stockName: item.stockName
          }
        }}
        id="stock-name"
      >
        <p>{item.stockName}</p>
      </Link>
      <a
        id="report"
        href={reportUrl + item.reportIdx}
        rel="noreferrer"
        target="_blank"
      >
        {slicer(item.reportName, 23)}
      </a>
      <p id="price-trade">{item.tradePrice}</p>
      <p id="price-goal" style={calColor(item.yield, 0)}>
        {item.priceGoal}
      </p>
      <p id="yield" style={calColor(item.yield, 0)}>
        {item.yield >= 0 ? '+' : ''}
        {item.yield}%
      </p>
    </>
  );
};

const Trending = ({ data }) => {
  const { t } = useTranslation();
  const trendingTitles = [
    t('Home.Trending.date'),
    t('Home.Trending.stock'),
    t('Home.Trending.report'),
    t('Home.Trending.tradePrice'),
    t('Home.Trending.target'),
    t('Home.Trending.yield')
  ];

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
    const trendingList = data.reports;
    return (
      <>
        <h4 className="section-titles">{t('Home.Trending.title')}</h4>
        <div id="trending-title">
          {trendingTitles.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
        <div id="trending-list">
          {trendingList.map((item) => (
            <li key={item.reportIdx}>
              <TrendingItem item={item} />
            </li>
          ))}
        </div>
      </>
    );
  }
};

export default Trending;
