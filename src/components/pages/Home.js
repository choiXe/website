import React, { useState } from "react";
import '../../App.css';
import './Home.css'

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

function Home() {
  const sectors = ["에너지", "원자재", "산업재", "경기소비재", "필수소비재", "헬스케어", "금융재", "정보기술재", "통신재", "유틸리티", "부동산/리츠"];
  const [mySector, setMySector] = useState();

  const Highlight = ({ active, count, onClick }) => {
    return (
      <div onClick={onClick} className={active ? "active" : "inactive"}>
        {count}
      </div>
    );
  };

  const showSector = () => {
    return (
      <div className="sector-style">
        {sectors.map(t => (
          <Highlight
            key={t}
            count={t}
            active={t === mySector}
            onClick={() => setMySector(t)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="left-container">
        <h3 className="left-title">섹터</h3>
        {showSector()}
      </div>
      <div className="right-container">
        <div className='sector-container'>
          <div id="stockContainer">
            {/*mySector != null ? showGraph(mySector, splitGroup(StockData())) : ''*/}
          </div>
          <p>{mySector}</p>
        </div>
        <div className='sector-container' style={{marginTop: '3%'}}>
          <p>Stock List</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
