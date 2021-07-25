import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import { numSeperator, calColor, slicer } from '../tools/formatter';
import { reportUrl } from '../tools/constants';

import './Trending.scss';

const TrendingItem = ({ item }) => {
  return (
    <>
      <p>{item.date}</p>
      <Link
        to={{
          pathname: '/stock',
          state: {
            stockId: item.stockId,
            stockName: item.stockName
          }
        }}
      >
        <p>{item.stockName}</p>
      </Link>
      <a href={reportUrl + item.reportIdx} rel="noreferrer" target="_blank">
        {slicer(item.reportName, 23)}
      </a>
      <p>{numSeperator(item.tradePrice)}</p>
      <p style={calColor(parseInt(item.yield), 0)}>
        {numSeperator(item.priceGoal)}
      </p>
      <p style={calColor(parseInt(item.yield), 0)}>
        {parseInt(item.yield) >= 0
          ? '+' + numSeperator(item.yield) + '%'
          : numSeperator(item.yield) + '%'}
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
        <h4>{t('Home.Trending.title')}</h4>
        <div id="trending-title">
          <div></div>
          {trendingTitles.map((title) => (
            <div key={title}>{title}</div>
          ))}
        </div>
        <div id="trending-list">
          {trendingList.map((item, index) => (
            <li key={item.reportIdx}>
              <p id="num">{index + 1}</p>
              <TrendingItem item={item} />
            </li>
          ))}
        </div>
      </>
    );
  }
};

export default Trending;
