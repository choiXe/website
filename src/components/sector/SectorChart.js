import React from "react";
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

const SectorChart = ({ stocks, selectHandler }) => {
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

  for (let i = 0; i < stocks.stockList.length; i++) {
    let sectorName = stocks.stockList[i].sSector;
    if (!data.hasOwnProperty(sectorName)) {
      data[sectorName] = {};
      sectorExpYield[sectorName] = [];
    };
    data[sectorName][stocks.stockList[i].stockName] = 
      [stocks.stockList[i].count, stocks.stockList[i].expYield];

    sectorExpYield[sectorName].push(stocks.stockList[i].expYield);
  };

  // Calculate average expected yield for each sector
  var average = (array) => array.reduce((a, b) => a + b) / array.length;

  // Prepare dataset to construct the treemap
  for (sector in data) {
    if (data.hasOwnProperty(sector)) {
      sectorVal = 0;
      sectorP = {
        id: 'id_' + sectorI,
        name: sector,
        color: average(sectorExpYield[sector]) >= stocks.avgYield 
        ? '#DEB4AF' : '#AFCADE'
      };
      companyI = 0;
      for (company in data[sector]) {
        if (data[sector].hasOwnProperty(company)) {
          companyP = {
            id: sectorP.id + '_' + companyI,
            name: company,
            color: data[sector][company][1] >= stocks.avgYield 
            ? '#DEB4AF' : '#AFCADE',
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
      <HighchartsReact
        highcharts={Highcharts}
        options={TreeMapOption(points, selectHandler)}
        />
    </div>
  )
};

export default SectorChart;
