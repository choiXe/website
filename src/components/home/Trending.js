import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { numSeperator } from '../tools/formatter';

import './Trending.scss';

const TrendingItem = ({ item }) => {
  const calColor = (x, y) => {
    if (x === '-') return { color: '#000000' };
    return x >= y ? { color: '#e21414' } : { color: '#246ded' };
  };

  const reportName =
    item.reportName.length > 23
      ? item.reportName.slice(0, 23) + '...'
      : item.reportName;

  const baseURL =
    'http://consensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=';

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
      <a href={baseURL + item.reportIdx} rel="noreferrer" target="_blank">
        {reportName}
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

const Trending = ({ trendingList }) => {
  const { t } = useTranslation();
  const trendingTitles = [
    t('Home.Trending.date'),
    t('Home.Trending.stock'),
    t('Home.Trending.report'),
    t('Home.Trending.tradePrice'),
    t('Home.Trending.target'),
    t('Home.Trending.yield')
  ];

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
};

export default Trending;
