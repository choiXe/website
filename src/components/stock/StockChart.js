import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { StockChartOption } from '../chartOption';

const StockChart = ({ data }) => {
  var ohlc = [],
    line = [],
    volume = [],
    dataLength = data.length,
    groupingUnits = [
      ['week', [1]],
      ['month', [1, 2, 3, 4, 6]]
    ];

  for (let i = 0; i < dataLength; i += 1) {
    let tempDate = new Date(data[i].date);
    ohlc.push([
      Date.parse(tempDate),
      data[i].start,
      data[i].high,
      data[i].low,
      data[i].end
    ]);
    line.push([Date.parse(tempDate), data[i].end])
    volume.push([Date.parse(tempDate), data[i].volume]);
  }

  const options = StockChartOption(ohlc, line, volume, groupingUnits);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
};

export default StockChart;
