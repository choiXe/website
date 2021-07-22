import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

import { BarChartOption } from '../chartOption';

HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const FinancialInfo = ({ dataSet }) => {
  const barChartData = {
		data: [
			{rv: '201866745000000', oProfit: '29240672000000', nProfit: '22726092000000'},
			{rv: '239575376000000', oProfit: '53645038000000', nProfit: '42186747000000'},
			{rv: '243771415000000', oProfit: '58886669000000', nProfit: '44344857000000'},
			{rv: '230400881000000', oProfit: '27768509000000', nProfit: '21738865000000'},
			{rv: '236806988000000', oProfit: '35993876000000', nProfit: '26407832000000'},
			{rv: '272100995238095', oProfit: '51781614285714', nProfit: '39085852380952'}
		],
		formatKR: [
			{rvKR: '201조 8,667억', oProfitKR: '29조 2,406억', nProfitKR: '22조 7,260억'},
			{rvKR: '239조 5,753억', oProfitKR: '53조 6,450억', nProfitKR: '42조 1,867억'},
			{rvKR: '243조 7,714억', oProfitKR: '58조 8,866억', nProfitKR: '44조 3,448억'},
			{rvKR: '230조 4,008억', oProfitKR: '27조 7,685억', nProfitKR: '21조 7,388억'},
			{rvKR: '236조 8,069억', oProfitKR: '35조 9,938억', nProfitKR: '26조 4,078억'},
			{rvKR: '272조 1,009억', oProfitKR: '51조 7,816억', nProfitKR: '39조 858억'}
		]
	};

	// Set null dates to false and filter them
	const temp_dates = dataSet.data.map(item => item.rv !== '0' && item.date.slice(0,4));
	const dates = temp_dates.filter(date => date);

	let rvData = [], oProfitData = [], nProfitData = [];
	for (let i = 0; i < temp_dates.length; i++) {
    if (temp_dates[i]) {
			rvData.push(parseInt(barChartData.data[i].rv));
			oProfitData.push(parseInt(barChartData.data[i].oProfit));
			nProfitData.push(parseInt(barChartData.data[i].nProfit));
		}
	};

	const yAxis = [
		{name: '매출', data: rvData}, 
		{name: '영업이익', data: oProfitData},
		{name: '순이익', data: nProfitData}
	];

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={BarChartOption(dates, yAxis)}
      />
    </div>
  )
};

export default FinancialInfo ;