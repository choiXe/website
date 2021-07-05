import React, { useState, useEffect } from 'react';

import SectorMenu from '../SectorMenu'
import StockList from './StockList'

import data from '../../services/data';

import './Sector.scss';

const Sector = ({ location }) => {
  const [sectorInfo, setSectorInfo] = useState(null);
  const curSector = location.state;
  const listTitle = ["종목이름", "가격(₩)", "변동률", "컨센서스 평균가",
    "상승여력", "그래프", "투자 점수"];

  useEffect(() => {
    data.getSectorInfo(curSector, "2021-06-01")
      .then(info => setSectorInfo(info.data.getSectorInfo));
  },[curSector])

  return (
    <div className="sector-container">
      <div className="menu-container">
        <SectorMenu selected={curSector}/>
      </div>

      <div className="info-container">
        <div className="chart-container">
          <h1 className='sector'>차트</h1>
          {curSector}
        </div>
        <div className="listtitle-container">
          {listTitle.map(title => <div key={title}> {title}</div>)}
        </div>
        <div className="stocklist-container">
          {sectorInfo 
            ? <StockList stocks={sectorInfo.stockList}/> 
            : "Loading..."}
        </div>
      </div>
    </div>
  )
};

export default Sector;
