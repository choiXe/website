import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Sticky from 'react-stickynode';
import InfiniteScroll from 'react-infinite-scroll-component';

import SectorMenu from '../SectorMenu'
import StockList from './StockList'
import SectorChart from './SectorChart'

import data from '../../services/data';

import './Sector.scss';

const Sector = ({ location }) => {
  const [cache, setCache] = useState(null);
  const [sectorData, setSectorData] = useState(null);
  const [daysPassed, setDaysPassed] = useState(30);
  const [orderType, setOrderType] = useState("yield");
  const curSector = location.state;

  const getPastDate = n => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  }


  useEffect(() => {
    document.title = curSector + " :: choiXe";

    const startDate = getPastDate(daysPassed);
    const cachedData = getFromCache(curSector, startDate);

    if (cachedData) {
      setSectorData(cachedData);
    } else {
      data.getSectorInfo(curSector, startDate)
        .then(data => {
          setSectorData(data.getSectorInfo)
          // here, save new loaded date into the cache
        });
    }
  },[curSector, daysPassed])

  const listTitle = ["종목이름", "가격(₩)", "변동률", "컨센서스 평균가",
    "상승여력", "그래프", "투자 점수"];
  const dateButtons = [5, 15, 30, 60, 90];

  if (!sectorData) {
    return (
      <div className='loading'>
        <Loader
          type='MutatingDots'
          color='#BBD2C5'
          secondaryColor='#536976'
          height={100}
          width={100}
          />
      </div>
    );
  } else {
    return (
      <div className="sector-container">
        <Sticky top={20} bottomBoundary=".stocklist-container" 
          innerClass="menu-container">
          <SectorMenu selected={curSector}/>
        </Sticky>
        <div className="info-container">
          <div className="sector-chart-container">
            <div className="chart-section">
              <h4>{curSector}</h4>
              <div className="chart">
                <SectorChart stocks={sectorData}/>
              </div>
            </div>
            <div className="numbers">
              <div className="date-buttons">
                {dateButtons.map(days => (
                  <button key={days} value={days} 
                    className={days===daysPassed ? "active" : ""}
                    onClick={({target}) => setDaysPassed(Number(target.value))}>
                    {days<30 ? days+"일" : days/30 + "개월"}
                  </button>
                ))}
              </div>
              <div className="yield">
                <h4>예상 기대 수익률</h4>
                <h1>{sectorData.avgYield>=0 ? " +" : " -"}
                  {sectorData.avgYield}%</h1>
              </div>
              <div className="top3-list">
                <h4>예상 수익률 Top 3 (소섹터)</h4>
                <div className="list">
                  <div className="item-1">
                    <div className="number">1. </div>
                    <div className="box-item">
                      <div>{sectorData.top3List.first}</div>
                      <div>{sectorData.top3List.firstYield}%</div>
                    </div>
                  </div>
                  <div className="item-2">
                    <div className="number">2. </div>
                    <div className="box-item">
                      <div>{sectorData.top3List.second}</div>
                      <div>{sectorData.top3List.secondYield}%</div>
                    </div>
                  </div>
                  <div className="item-3">
                    <div className="number">3. </div>
                    <div className="box-item">
                      <div>{sectorData.top3List.third}</div>
                      <div>{sectorData.top3List.thirdYield}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="listtitle-container">
            {listTitle.map(title => <div key={title}> {title}</div>)}
          </div>
          <div className="stocklist-container">
            <div className="order-btn-container">
              <p>order by </p>
              <div className="order-buttons">
                <button onClick={() => setOrderType("yield")}>yield</button>
                <button onClick={() => setOrderType("score")}>score</button>
              </div>
            </div>
            <InfiniteScroll dataLength={40} height="40rem">
              <StockList stocks={sectorData.stockList} order={orderType}/> 
            </InfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
};

export default Sector;
