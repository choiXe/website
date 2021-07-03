import React, { useState } from "react";

import SectorMenu from './SectorMenu';

//import '../../App.css';
import './styles/Home.scss'



/*
<script src="https://code.highcharts.com/stock/highstock.js"></script>
<script src="https://code.highcharts.com/stock/modules/data.js"></script>
<script src="https://code.highcharts.com/stock/modules/drag-panes.js"></script>
<script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
*/

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

/*
const loadHighchartsAndCreateChart = async (option) => {
  const { default: Highcharts } =
    await import('https://code.highcharts.com/stock/highstock.js');
    await import('https://code.highcharts.com/stock/modules/data.js');
    await import('https://code.highcharts.com/stock/modules/drag-panes.js');
    await import('https://code.highcharts.com/stock/modules/exporting.js');

    Highcharts.stockChart('stockContainer', option);
};
*/

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

  // create the chart
  let charOption = {
    //Highcharts.stockChart('stockContainer', {
    rangeSelector: { selected: 1 },
    title: { text: 'My Stock Data' },
    yAxis: [{
      labels: { align: 'right', x: -3},
      title: { text: 'OHLC'},
      height: '60%',
      lineWidth: 2,
      resize: { enabled: true }
    }, {
      labels: { align: 'right', x: -3 },
      title: { text: 'Volume' },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    tooltip: { split: true },
    series: [{
      type: 'candlestick',
      name: 'My Stock',
      data: ohlc,
      dataGrouping: { units: groupingUnits }
    }, {
      type: 'column',
      name: 'Volume',
      data: volume,
      yAxis: 1,
      dataGrouping: { units: groupingUnits }
    }]
  };
  //);
  //loadHighchartsAndCreateChart(charOption);
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
        <div className='sector-container'>
          <div id="stockContainer">
            {/*mySector != null ? showGraph(mySector, splitGroup(StockData())) : ''*/}
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
