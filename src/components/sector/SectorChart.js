import React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const SectorChart = ({ sectorName, groupedData }) => {
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

    const options = chartOption(ohlc, volume, groupingUnits);

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    )
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={type}
      options={options}
    />
  )
};

export default SectorChart;
