import React from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChart = ({ which ,chartType, options,  }) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={type}
      options={options}
    />
  )
};

export default StockChart;
