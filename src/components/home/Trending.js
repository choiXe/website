import React from 'react';
import { useTranslation } from 'react-i18next';

import './Trending.scss';

const TrendingItem = ({ item }) => {
  const reportName =
    item.reportName.length > 23
      ? item.reportName.slice(0, 23) + '...'
      : item.reportName;

  const baseURL =
    'http://consensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=';

  const numbWithCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num;
    }
  };

  const analystList = item.analyst.split(',');
  var analyst;
  if (analystList.length > 1) {
    analyst = analystList[0] + ' 등';
  } else {
    analyst = analystList[0];
  }

  return (
    <>
      <p>{item.date}</p>
      <p>{item.stockName}</p>
      <a href={baseURL + item.reportIdx} rel="noreferrer" target="_blank">
        {reportName}
      </a>
      <p>{numbWithCommas(item.priceGoal)}</p>
      <p>{analyst}</p>
      <p>{item.firm}</p>
    </>
  );
};

const Trending = ({ trendingList }) => {
  const { t } = useTranslation();
  const trendingTitles = [
    t('Home.Trending.date'),
    t('Home.Trending.stock'),
    t('Home.Trending.report'),
    t('Home.Trending.target'),
    t('Home.Trending.analyst'),
    t('Home.Trending.firm')
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
            <p>{index + 1}</p>
            <TrendingItem item={item} />
          </li>
        ))}
      </div>
    </>
  );
};

export default Trending;
