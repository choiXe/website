import React from "react";
import sectorList from './sectorData';  // delete this after adding 'count'
import { TreeMapOption } from "../chartOption";

import Highcharts from "highcharts";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsTreeChart from "highcharts/modules/treemap";
import HighchartsReact from "highcharts-react-official";

HighchartsData(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsTreeChart(Highcharts);
HighchartsExporting(Highcharts);

const SectorChart = ({ stocks }) => {
  console.log(stocks)
  var data = {},
      sectorExpYield = {},
      points = [],
      sectorI = 0,
      sectorP,
      companyI,
      companyP,
      sectorVal,
      sector,
      company;

  // Organize the imported dataset into a desired format
  for (let i = 0; i < sectorList.length; i++) {
    let sectorName = sectorList[i].sSector;
    if (!data.hasOwnProperty(sectorName)) {
      data[sectorName] = {};
      sectorExpYield[sectorName] = [];
    }
    data[sectorName][sectorList[i].stockName] = [sectorList[i].count, sectorList[i].expYield];
    sectorExpYield[sectorName].push(sectorList[i].expYield);
  }

  // Delete lines 31-39 and uncomment the code below after adding 'count'
  /*
  for (let i = 0; i < stocks.stockList.length; i++) {
    let sectorName = stocks.stockList[i].sSector;
    if (!data.hasOwnProperty(sectorName)) {
      data[sectorName] = {};
      sectorExpYield[sectorName] = [];
    };
    data[sectorName][stocks.stockList[i].stockName] = [stocks.stockList[i].count, stocks.stockList[i].expYield];
    sectorExpYield[sectorName].push(stocks.stockList[i].expYield);
  };
  */

  // Calculate average expected yield for each sector
  var average = (array) => array.reduce((a, b) => a + b) / array.length;

  // Prepare dataset to construct the treemap
  for (sector in data) {
    if (data.hasOwnProperty(sector)) {
      sectorVal = 0;
      sectorP = {
        id: 'id_' + sectorI,
        name: sector,
        color: average(sectorExpYield[sector]) >= stocks.avgYield ? 'red' : 'blue'
      };
      companyI = 0;
      for (company in data[sector]) {
        if (data[sector].hasOwnProperty(company)) {
          companyP = {
            id: sectorP.id + '_' + companyI,
            name: company,
            color: data[sector][company][1] >= stocks.avgYield ? 'red' : 'blue',
            parent: sectorP.id,
            value: data[sector][company][0],
          };
          sectorVal += companyP.value;
          points.push(companyP);
          companyI = companyI + 1;
        };
      };
      sectorP.value = sectorVal;
      points.push(sectorP);
      sectorI = sectorI + 1;
    };
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={TreeMapOption(points)} />
    </div>
  )
};

export default SectorChart;
