import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import StockChart from './StockChart';
import InvStatList from './InvStatList';
import ReportList from './ReportList';
import NewsList from './NewsList';
import WordCloud from './WordCloud';

import data from '../../services/data';
import './Stock.scss';

const Stock = ({ location }) => {
  const [listType, setListType] = useState('analyst');
  const [stockData, setStockData] = useState(null);
  const daysPassed = 30;
  const stockId = location.state.stockId;
  const stockName = location.state.stockName;
  const red = '#E21414',
    blue = '#246DED';

  const getPastDate = (n) => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  };

  const numbWithCommas = (num) => {
    if (num != null) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = stockName + ' :: choiXe';
    const startDate = getPastDate(daysPassed);
    data
      .getStockInfo(stockId, startDate)
      .then((data) => setStockData(data.getStockInfo));
  }, [stockId, stockName]);

  if (!stockData) {
    return (
      <div className="loading">
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
    const invStatTitle = ['날짜', '개인', '외국인', '기관'];
    const reportTitle = [
      '날짜',
      '제목',
      '애널리스트',
      '목표가 (₩)',
      '제공출처'
    ];
    const newsTitle = ['날짜', '제목'];
    const titleList = listType === 'analyst' ? reportTitle : newsTitle;
    const statColor = stockData.changeRate >= 0 ? red : blue;
    const priceY = stockData.tradePrice - stockData.changePrice;

    const getColor = (n) => {
      if (n > priceY) {
        return { color: red };
      } else if (n < priceY) {
        return { color: blue };
      }
    };

    return (
      <div>
        <div id="stock">
          <h1 id="title">
            <div className="name">{stockData.name}</div>
            <div className="id">{stockId}</div>
          </h1>
          <div id="chart-section">
            <div className="numbers">
              <p>기대 수익률 (3개월) </p>
              <h1
                className="yield"
                style={{ color: stockData.expYield > 0 ? red : blue }}
              >
                {Math.round(stockData.expYield)}
                <div className="percent">%</div>
              </h1>
              <div className="price-container">
                <div>
                  <p>현재가</p>
                  <h4>{numbWithCommas(stockData.tradePrice)}</h4>
                </div>
                <div>
                  <p>컨센서스 평균가</p>
                  <h4>
                    {stockData.priceAvg !== '의견 없음'
                      ? numbWithCommas(stockData.priceAvg)
                      : stockData.priceAvg}
                  </h4>
                </div>
              </div>
              <div className="score-container">
                <p>투자 매력 점수</p>
                <h4>{stockData.score}</h4>
              </div>
            </div>
            <div className="chart-area">
              <div className="chart-stat">
                <div className="stat-item">
                  전일: <p>{numbWithCommas(priceY)}</p>
                </div>
                <div className="stat-item">
                  시가:{' '}
                  <p style={getColor(stockData.openingPrice)}>
                    {numbWithCommas(stockData.openingPrice)}
                  </p>
                </div>
                <div className="stat-item">
                  고가:{' '}
                  <p style={getColor(stockData.highPrice)}>
                    {numbWithCommas(stockData.highPrice)}
                  </p>
                </div>
                <div className="stat-item">
                  저가:{' '}
                  <p style={getColor(stockData.lowPrice)}>
                    {numbWithCommas(stockData.lowPrice)}
                  </p>
                </div>
                <div className="stat-item">
                  변동:
                  <p>
                    <span style={{ color: statColor }}>
                      {' ' + numbWithCommas(stockData.changePrice)}
                    </span>
                  </p>
                </div>
                <div className="stat-item">
                  <p>
                    변동(%):
                    <span style={{ color: statColor }}>
                      {(stockData.changeRate >= 0 ? ' +' : ' ') +
                        stockData.changeRate +
                        '%'}
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
            <h4>투자정보</h4>
            <div className="inv-info-items">
              <h5>시가총액</h5>
              <p>{stockData.marketCap}</p>
              <h5>52주 최고가</h5>
              <p>{numbWithCommas(stockData.high52wPrice)}</p>
              <h5>52주 최저가</h5>
              <p>{numbWithCommas(stockData.low52wPrice)}</p>
              <h5>외국인 소진율</h5>
              <p>{stockData.foreignRatio + '%'}</p>
              <h5>PER</h5>
              <p>{stockData.per + '배'}</p>
              <h5>PBR</h5>
              <p>{stockData.pbr + '배'}</p>
              <h5>ROE</h5>
              <p>{stockData.roe + '%'}</p>
            </div>
          </div>
          <div id="company-info">
            <h4>
              기업정보 <span>{'WICS: ' + stockData.wicsSectorName}</span>
            </h4>
            <p>{stockData.companySummary}</p>
          </div>
          <div id="inv-stat">
            <div className="inv-stat-description">투자자 동향</div>
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
                애널리스트 리포트
              </button>
              <button
                className={listType === 'news' ? 'active' : ''}
                onClick={(e) => {
                  setListType('news');
                }}
              >
                뉴스
              </button>
            </div>
            <div className="list-table">
              <div
                className={
                  listType === 'analyst'
                    ? 'list-title report'
                    : 'list-title news'
                }
              >
                {titleList.map((title) => (
                  <div key={title}> {title}</div>
                ))}
              </div>
              <div className="list-content">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Stock;
