import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import SectorMenu from './SectorMenu';

import './styles/Home.scss'
import StockData from '../StockData';
import chartOption from "../unassigned/chartOption";

// Temporary function to test the graph selection
function splitGroup(data) {
  let sectorGroup1 = ["에너지", "헬스케어", "정보기술재", "부동산/리츠"];
  let sectorGroup2 = ["산업재", "필수소비재", "금융재", "통신재"];
  let sectorGroup3 = ["원자재", "경기소비재", "유틸리티"];

  // 20, 20, 25
  let dateGroup1 = data.slice(0, 20);
  let dateGroup2 = data.slice(20, 40);
  let dateGroup3 = data.slice(40, data.length);

  return [sectorGroup1, sectorGroup2, sectorGroup3, dateGroup1, dateGroup2, dateGroup3];
};

function showGraph(sector, fullData) {
  var data = fullData[0].includes(sector) ? fullData[3] : fullData[1].includes(sector) ? fullData[4] : fullData[5];
  var ohlc = [],
    volume = [],
    dataLength = data.length,
    groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
    i = 0;

  for (i; i < dataLength; i += 1) {
    let tempDate = new Date(data[i].date);
    // date, open, high, low, close
    ohlc.push([Date.parse(tempDate), data[i].start, data[i].high, data[i].low, data[i].end]);
    // date, volume
    volume.push([Date.parse(tempDate), data[i].volume]);
  };

  const option = chartOption(ohlc, volume, groupingUnits);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  )
};

const Home = () => {
  // currently selected Sector
  const [curSector, setCurSector] = useState("");

  return (
    <div className="container">
      <div className="left-container">
        <h3 className="left-title">섹터</h3>
        <SectorMenu curSector={curSector} setCurSector={setCurSector}/>
      </div>
      <div className="right-container">
        <div className='sector-container' style={{flexDirection:'row'}}>
          <div id="stockContainer">
            {mySector != null ? showGraph(mySector, splitGroup(StockData())) : ''}
          </div>
          <p>{curSector}</p>
        </div>
        <div className='sector-container' style={{marginTop: '3%'}}>
          <p>Stock List</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
