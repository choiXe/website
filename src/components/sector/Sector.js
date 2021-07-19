import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Sticky from 'react-stickynode';
import InfiniteScroll from 'react-infinite-scroll-component';

import SectorMenu from './SectorMenu';
import StockList from './StockList';
import SectorChart from './SectorChart';

import data from '../../services/data';

import './Sector.scss';

const Sector = ({ location }) => {
  const [cache, setCache] = useState({});
  const [sectorData, setSectorData] = useState(null);
  const [daysPassed, setDaysPassed] = useState(30);
  const [orderType, setOrderType] = useState('yield');
  const [sSectorSelected, setsSectorSelected] = useState(null);
  const dateButtons = [5, 15, 30, 60, 90];
  const curSector = location.state;

  const getPastDate = (n) => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    document.title = curSector + ' :: choiXe';
    const startDate = getPastDate(daysPassed);

    const key = curSector + '_' + startDate;
    const cachedData = cache[key];

    if (cachedData) {
      setSectorData(cachedData);
    } else {
      data.getSectorInfo(curSector, startDate).then((data) => {
        setSectorData(data.getSectorInfo);
        const updatedCache = {
          ...cache,
          [key]: data.getSectorInfo
        };
        setCache(updatedCache);
      });
    }
  }, [curSector, daysPassed, cache]);

  const renderContent = (sectorData) => {
    if (!sectorData) {
      return (
        <div id="info">
          <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
        </div>
      );
    } else {
      const stocks = sectorData.stockList.filter((stock) => {
        if (!sSectorSelected) {
          return true;
        }
        return stock.sSector === sSectorSelected;
      });
      return (
        <div id="info">
          <div id="chart-section">
            <div>
              <h4>{curSector}</h4>
              <div className="chart">
                <SectorChart
                  stocks={sectorData}
                  selectHandler={setsSectorSelected}
                />
              </div>
            </div>
            <div>
              <div className="date-select">
                {dateButtons.map((days) => (
                  <button
                    key={days}
                    value={days}
                    className={days === daysPassed ? 'active' : ''}
                    onClick={({ target }) =>
                      setDaysPassed(Number(target.value))
                    }
                  >
                    {days < 30 ? days + '일' : days / 30 + '개월'}
                  </button>
                ))}
              </div>
              <div className="yield">
                <h4>예상 기대 수익률</h4>
                <h1>
                  {sectorData.avgYield >= 0 ? ' +' : ' -'}
                  {sectorData.avgYield}%
                </h1>
              </div>
              <div className="top3-list">
                <h4>예상 수익률 Top 3 (소섹터)</h4>
                <div className="list">
                  <div className="item">
                    <div className="number">1. </div>
                    <div className="box-item" id="item-1">
                      <div>{sectorData.top3List.first}</div>
                      <div>{sectorData.top3List.firstYield}%</div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">2. </div>
                    <div className="box-item" id="item-2">
                      <div>{sectorData.top3List.second}</div>
                      <div>{sectorData.top3List.secondYield}%</div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">3. </div>
                    <div className="box-item" id="item-3">
                      <div>{sectorData.top3List.third}</div>
                      <div>{sectorData.top3List.thirdYield}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="list-title">
            <div>종목이름</div>
            <div>가격</div>
            <div>전일 대비</div>
            <div>변동률</div>
            <div>컨센서스 평균가</div>
            <div>
              <button onClick={() => setOrderType('yield')}>
                상승여력{' '}
                <i
                  className={
                    orderType === 'yield' ? 'fas fa-sort-down' : 'fas fa-sort'
                  }
                ></i>
              </button>
            </div>
            <div>
              <button onClick={() => setOrderType('score')}>
                투자 점수{' '}
                <i
                  className={
                    orderType === 'score' ? 'fas fa-sort-down' : 'fas fa-sort'
                  }
                ></i>
              </button>
            </div>
          </div>
          <div id="stock-list">
            <InfiniteScroll dataLength={40} height="40rem">
              <StockList stocks={stocks} order={orderType} />
            </InfiniteScroll>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="sector">
      <Sticky top={20} bottomBoundary="#stocklist" innerClass="menu">
        <SectorMenu selected={curSector} selectHandler={setsSectorSelected} />
      </Sticky>
      {renderContent(sectorData)}
    </div>
  );
};

export default Sector;
