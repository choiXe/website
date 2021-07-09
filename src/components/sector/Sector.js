import React, { useState, useEffect } from 'react';

import SectorMenu from '../SectorMenu'
import StockList from './StockList'
import SectorChart from './SectorChart'

import data from '../../services/data';

import './Sector.scss';


const Sector = ({ location }) => {
  const [sectorData, setSectorData] = useState(null);
  const [daysPassed, setDaysPassed] = useState(30);
  const curSector = location.state;

  const nDayBeforeToday = n => {
    const r = new Date();
    r.setDate(r.getDate() - n);
    const month = r.getMonth() < 10 ? "0"+r.getMonth() : r.getMonth();
    const date = r.getDate() < 10 ? "0"+r.getDate() : r.getDate();
    return r.getFullYear()+"-"+month+"-"+date;
  }

  useEffect(() => {
    const startDate = nDayBeforeToday(daysPassed);
    data.getSectorInfo(curSector, startDate)
      .then(data => setSectorData(data.getSectorInfo));
  },[curSector, daysPassed])

  const listTitle = ["종목이름", "가격(₩)", "변동률", "컨센서스 평균가",
    "상승여력", "그래프", "투자 점수"];
  const dateButtons = [5, 15, 30, 60, 90];

  if (!sectorData) {
    return <div> Loading </div>
  } else {
    return (
      <div className="sector-container">
        <div className="menu-container">
          <SectorMenu selected={curSector}/>
        </div>

        <div className="info-container">
          <div className="sector-chart-container">
            <div className="chart-section">
              <h4>{curSector}</h4>
              <div className="chart">
                <SectorChart />
              </div>
            </div>
            <div className="numbers">
              <div className="date-buttons">
                {dateButtons.map(days => (
                  <button key={days} value={days} 
                    className={days===daysPassed ? "active" : ""}
                    onClick={({target}) => setDaysPassed(Number(target.value))}
                  >
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
                    <div>1. </div>
                    <div className="box-item">
                      {sectorData.top3List.first}
                      {" "}{sectorData.top3List.firstYield}%
                    </div>
                  </div>
                  <div className="item-2">
                    <div>2. </div>
                    <div className="box-item">
                      {sectorData.top3List.second}
                      {" "}{sectorData.top3List.secondYield}%
                    </div>
                  </div>
                  <div className="item-3">
                    <div>3. </div>
                    <div className="box-item">{sectorData.top3List.third}
                      {" "}{sectorData.top3List.thirdYield}%
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
            <StockList stocks={sectorData.stockList}/> 
          </div>
        </div>
      </div>
    )
  }
};

export default Sector;
