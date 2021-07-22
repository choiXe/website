import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsSeriesLabel from 'highcharts/modules/series-label';

import data from '../../services/data';

import { BarChartOption, LineChartOption } from '../chartOption';

HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsSeriesLabel(Highcharts);

const FinancialInfo = ({ stockId, stockName }) => {
	const [dataSet, setDataSet] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
    document.title = stockName + ' :: choiXe';
    data
      .getFinancialInfo(stockId)
      .then((data) => setDataSet(data.getFinancialInfo));
  }, [stockId, stockName]);

	if (!dataSet) {
    return (
      <div className="loading">
        <Loader
          type="MutatingDots"
          color="#BBD2C5"
          secondaryColor="#536976"
          height={100}
          width={100}
        />
      </div>
    );
  } else {
		// Set null dates to false and filter them
		const temp_dates = dataSet.data.map(item => item.rv !== '0' && item.date.slice(0,4));
		const dates = temp_dates.filter(date => date);

		let rvData = [], oProfitData = [], nProfitData = [], rGrowthData = [], opGrowthData = [], oMarginData = [];
		for (let i = 0; i < temp_dates.length; i++) {
			if (temp_dates[i]) {
				rvData.push(parseInt(dataSet.data[i].rv));
				oProfitData.push(parseInt(dataSet.data[i].oProfit));
				nProfitData.push(parseInt(dataSet.data[i].nProfit));
				rGrowthData.push(parseInt(dataSet.data[i].rGrowth));
				opGrowthData.push(parseInt(dataSet.data[i].opGrowth));
				oMarginData.push(parseInt(dataSet.data[i].oMargin));
			}
		};

		// Prepare dataset for BarChart
		const yAxisBarChart = [
			{name: t('Stock.FinancialInfo.rv'), data: rvData}, 
			{name: t('Stock.FinancialInfo.oProfit'), data: oProfitData},
			{name: t('Stock.FinancialInfo.nProfit'), data: nProfitData}
		];

		// Prepare dataset for LineChart 1
		const yAxisLineChart1 = [{name: t('Stock.FinancialInfo.rGrowth'), data: rGrowthData}];
		// Prepare dataset for LineChart 2
		const yAxisLineChart2 = [
			{name: t('Stock.FinancialInfo.opGrowth'), data: opGrowthData}, 
			{name: t('Stock.FinancialInfo.oMargin'), data: oMarginData}
		];

		return (
			<div>
				<div>
					<HighchartsReact
						highcharts={Highcharts}
						options={BarChartOption(dates, yAxisBarChart)}
					/>
				</div>
				<div>
					<HighchartsReact
						highcharts={Highcharts}
						options={LineChartOption(dates, yAxisLineChart1)}
					/>
					<HighchartsReact
						highcharts={Highcharts}
						options={LineChartOption(dates, yAxisLineChart2)}
					/>
				</div>
			</div>
		)
	}
};

export default FinancialInfo ;