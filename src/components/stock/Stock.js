import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { calColor, strToNum } from '../tools/formatter';

import StockChart from './StockChart';
import InvStatList from './InvStatList';
import ReportList from './ReportList';
import NewsList from './NewsList';
import FinancialInfo from './FinancialInfo';
import WordCloud from './WordCloud';

import data from '../../services/data';
import './Stock.scss';

const Stock = ({ location }) => {
  const { t } = useTranslation();
  const [listType, setListType] = useState('analyst');
  const [stockData, setStockData] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const daysPassed = 30;

  const stockId = location.state ? location.state.stockId : '005930';
  const stockName = location.state ? location.state.stockName : '삼성전자';

  const getPastDate = (n) => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setSuccess(
        favorites
        .find(stock => stock.stockId === stockId)
        !== undefined
      )
    }
  }, [stockId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = stockName + ' :: choiXe';
    const startDate = getPastDate(daysPassed);
    data
      .getStockInfo(stockId, startDate)
      .then((data) => setStockData(data.getStockInfo));
  }, [stockId, stockName]);

  console.log(stockData)

  if (!stockData) {
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
    const priceY = strToNum(stockData.lastClosePrice);
    const invStatTitle = [
      t('Stock.InvStat.date'),
      t('Stock.InvStat.indiv'),
      t('Stock.InvStat.foreign'),
      t('Stock.InvStat.inst')
    ];
    const reportTitle = [
      t('Stock.Analyst.date'),
      t('Stock.Analyst.report'),
      t('Stock.Analyst.analyst'),
      t('Stock.Analyst.target'),
      t('Stock.Analyst.firm')
    ];
    const newsTitle = [t('Stock.News.date'), t('Stock.News.news')];
    const titleList =
      listType === 'analyst'
      ? reportTitle
      : listType === 'news'
      ? newsTitle
      : '';

    const addFavorite = (event) => {
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      if (!favorites) {
        favorites = [];
      }
      const hasDuplicate = favorites.find(
        (stock) => stock.name === stockData.name
      );
      if (hasDuplicate) {
        setMessage(t('Stock.watchlist.duplicate'));
        setTimeout(() => setMessage(''), 1000);
      } else {
        favorites.push({ name: stockName, stockId: stockId });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setSuccess(true);
      }
    };

    let wicsSectorName;

    try {
      wicsSectorName = stockData.wicsSectorName.replace(/ /g, '');
    } catch (e) {
      wicsSectorName = 'null';
    }

    return (
      <div id="stock">
        <div id="title">
          <h1 id="name">
            <div className="name">{stockData.name}</div>
            <div className="id">{stockId}</div>
          </h1>
          <div className="add-button">
            <button onClick={addFavorite}>
              {success
                ? t('Stock.watchlist.success')
                : t('Stock.watchlist.title')}
            </button>
            <p>{message}</p>
          </div>
        </div>
        <div id="stock-chart">
          <div className="numbers">
            <div>
              <p>{t('Stock.Caption.avgYield')} </p>
              <h1
                className="yield"
                style={calColor(parseFloat(stockData.expYield), 0)}
              >
                {stockData.expYield}
                <div className="percent">%</div>
              </h1>
            </div>
            <div>
              <div className="price-container">
                <div>
                  <p>{t('Stock.Caption.price')}</p>
                  <h4>{stockData.tradePrice}</h4>
                </div>
                <div>
                  <p>{t('Stock.Caption.consensus')}</p>
                  <h4>{stockData.priceAvg}</h4>
                </div>
              </div>
              <div className="score-container">
                <div className="tooltip">
                  <p>{t('Stock.Caption.score')}</p>
                  <div className="top">
                    <div className="text-content">
                      <div id="bottom-margin"></div>
                      <span>{t('Stock.score-description')}</span>
                      <div id="bottom-margin"></div>
                    </div>
                    <i></i>
                  </div>
                </div>
                <h4>{stockData.score}</h4>
              </div>
            </div>
          </div>
          <div className="chart-area">
            <div className="chart-stat">
              <div className="stat-item">
                {t('Stock.Caption.close')}
                <p>{stockData.lastClosePrice}</p>
              </div>
              <div className="stat-item">
                {t('Stock.Caption.open')}
                <p style={calColor(strToNum(stockData.openingPrice), priceY)}>
                  {stockData.openingPrice}
                </p>
              </div>
              <div className="stat-item">
                {t('Stock.Caption.high')}
                <p style={calColor(strToNum(stockData.highPrice), priceY)}>
                  {stockData.highPrice}
                </p>
              </div>
              <div className="stat-item">
                {t('Stock.Caption.low')}
                <p style={calColor(strToNum(stockData.lowPrice), priceY)}>
                  {stockData.lowPrice}
                </p>
              </div>
              <div className="stat-item">
                {t('Stock.Caption.change')}
                <p>
                  <span style={calColor(parseFloat(stockData.changeRate), 0)}>
                    {stockData.changePrice}
                  </span>
                </p>
              </div>
              <div className="stat-item">
                {t('Stock.Caption.rate')}
                <p>
                  <span style={calColor(parseFloat(stockData.changeRate), 0)}>
                    {parseFloat(stockData.changeRate) >= 0 ? '+' : ''}
                    {stockData.changeRate}%
                  </span>
                </p>
              </div>
            </div>
            <div className="chart">
              <StockChart data={stockData.pastData} />
            </div>
          </div>
        </div>
        <div id="inv-info">
          <h4>{t('Stock.InvInfo.title')}</h4>
          <div className="inv-info-items">
            <div>
              <h5>{t('Stock.InvInfo.marketCap')}</h5>
              <p>{stockData.marketCap}</p>
            </div>
            <div>
              <h5>{t('Stock.InvInfo.52High')}</h5>
              <p>{stockData.high52wPrice}</p>
            </div>
            <div>
              <h5>{t('Stock.InvInfo.52Low')}</h5>
              <p>{stockData.low52wPrice}</p>
            </div>
            <div>
              <h5>{t('Stock.InvInfo.foreign')}</h5>
              <p>{stockData.foreignRatio}</p>
            </div>
            <div>
              <div className="tooltip">
                <h5>PER</h5>
                <div className="top">
                  <div className="text-content">
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.per')}</span>
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.low')}</span>
                    <div id="bottom-margin"></div>
                  </div>
                  <i></i>
                </div>
              </div>
              <p>{stockData.per}</p>
            </div>
            <div>
              <div className="tooltip">
                <h5>PBR</h5>
                <div className="top">
                  <div className="text-content">
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.pbr')}</span>
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.low')}</span>
                    <div id="bottom-margin"></div>
                  </div>
                  <i></i>
                </div>
              </div>
              <p>{stockData.pbr}</p>
            </div>
            <div>
              <div className="tooltip">
                <h5>ROE</h5>
                <div className="top">
                  <div className="text-content">
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.roe')}</span>
                    <div id="bottom-margin"></div>
                    <span>{t('Stock.InvInfo.high')}</span>
                    <div id="bottom-margin"></div>
                  </div>
                  <i></i>
                </div>
              </div>
              <p>{stockData.roe}</p>
            </div>
          </div>
        </div>
        <div id="inv-stat">
          <div className="inv-stat-description">{t('Stock.InvStat.title')}</div>
          <div className="inv-stat-title">
            {invStatTitle.map((title) => (
              <div key={title}>{title}</div>
            ))}
          </div>
          <div className="inv-list">
            <InfiniteScroll dataLength={40} height="22rem">
              <InvStatList dataSet={stockData.invStatistics} />
            </InfiniteScroll>
          </div>
        </div>
        <div id="wordcloud">
          <WordCloud newsTitles={stockData.newsTitles} />
        </div>
        <div id="list-table">
          <div className="list-button">
            <button
              className={listType === 'analyst' ? 'active' : ''}
              onClick={(e) => {
                setListType('analyst');
              }}
            >
              {t('Stock.Analyst.title')}
            </button>
            <button
              className={listType === 'news' ? 'active' : ''}
              onClick={(e) => {
                setListType('news');
              }}
            >
              {t('Stock.News.title')}
            </button>
            <button
              className={listType === 'financial' ? 'active' : ''}
              onClick={(e) => {
                setListType('financial');
              }}
            >
              {t('Stock.FinancialInfo.title')}
            </button>
            <button
              className={listType === 'companyInfo' ? 'active' : ''}
              onClick={(e) => {
                setListType('companyInfo');
              }}
            >
              {t('Stock.companyInfo')}
            </button>
          </div>
          <div className="list-table">
            <div
              className={
                listType === 'analyst' ? 'list-title report' : 'list-title news'
              }
            >
              {titleList.length > 0 &&
                  titleList.map((title) => <div key={title}> {title}</div>)}
            </div>
            <div className="list-content">
              {listType === 'financial' ? (
                <FinancialInfo stockId={stockId} stockName={stockName} />
              ) : listType === 'companyInfo' ? (
                <div id="company-info">
                  <h4>
                    <span>
                      {'WICS: ' + t('Sector.Highchart.' + wicsSectorName)}
                    </span>
                  </h4>
                  <p>{stockData.companySummary}</p>
                </div>
              ) : (
                <InfiniteScroll dataLength={40} height="40rem">
                  {listType === 'analyst' ? (
                    <ReportList
                      dataSet={stockData.reportList}
                      stockName={stockData.name}
                    />
                  ) : (
                    <NewsList dataSet={stockData.news} />
                  )}
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Stock;
