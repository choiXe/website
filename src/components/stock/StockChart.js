import React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import chartOption from '../chartOption';

const StockChart = ({ data }) => {
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
  );
};

export default StockChart;
