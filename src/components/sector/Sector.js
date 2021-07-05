import React, { useState, useEffect } from 'react';

import SectorMenu from '../SectorMenu'
import StockList from './StockList'

import data from '../../services/data';

import './Sector.scss';

const Sector = ({ location }) => {
  const [sectorInfo, setSectorInfo] = useState(null);
  const sectorName = location.state;
  const listTitle = ["종목이름", "가격(₩)", "변동률", "컨센서스 평균가",
    "오차", "그래프", "투자 권고"];

  useEffect(() => {
    data.getSectorInfo(sectorName, "2021-06-01")
      .then(info => setSectorInfo(info.data.getSectorInfo));
  },[sectorName])

  const numbWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="stock-container">
      <div className="menu-container">
        <SectorMenu selected={sectorName}/>
      </div>

      <div className="info-container">
        <div className="chart-container">
          <h1 className='sector'>차트</h1>
          {sectorName}
        </div>
        <div className="listtitle-container">
          {listTitle.map(title => <div key={title}> {title}</div>)}
        </div>
        <div className="stocklist-container">
          {sectorInfo ? <StockList stocks={sectorInfo.stockList}/>
          : "nothing"}
        </div>
      </div>
    </div>
  )
};

export default Sector;
