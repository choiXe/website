import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

import data from '../../services/data';

import { BarChartOption, LineChartOption } from '../chartOption';

import './FinancialInfo.scss';

HighchartsAccessibility(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

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
    const temp_dates = dataSet.data.map(
      (item) => item.rv !== '0' && item.date.slice(0, 4)
    );
    const dates = temp_dates.filter((date) => date);

    let rvData = [],
      oProfitData = [],
      nProfitData = [],
      rGrowthData = [],
      opGrowthData = [],
      oMarginData = [],
      npMarginData = [],
      label = {};

    for (let i = 0; i < temp_dates.length; i++) {
      if (temp_dates[i]) {
        rvData.push(parseInt(dataSet.data[i].rv));
        oProfitData.push(parseInt(dataSet.data[i].oProfit));
        nProfitData.push(parseInt(dataSet.data[i].nProfit));
        rGrowthData.push(parseInt(dataSet.data[i].rGrowth));
        opGrowthData.push(parseInt(dataSet.data[i].opGrowth));
        oMarginData.push(parseInt(dataSet.data[i].oMargin));
        npMarginData.push(parseInt(dataSet.data[i].npMargin));

        label[parseInt(dataSet.data[i].rv)] = dataSet.formatKR[i].rvKR;
        label[parseInt(dataSet.data[i].oProfit)] =
          dataSet.formatKR[i].oProfitKR;
        label[parseInt(dataSet.data[i].nProfit)] =
          dataSet.formatKR[i].nProfitKR;
      }
    }

    // Prepare dataset for BarChart
    const yAxisBarChart = [
      {
        name: t('Stock.FinancialInfo.rv'),
        data: rvData,
        type: 'column',
        yAxis: 1
      },
      {
        name: t('Stock.FinancialInfo.oProfit'),
        data: oProfitData,
        type: 'column',
        yAxis: 1
      },
      {
        name: t('Stock.FinancialInfo.nProfit'),
        data: nProfitData,
        type: 'column',
        yAxis: 1
      },
      { name: t('Stock.FinancialInfo.oMargin'), data: oMarginData },
      { name: t('Stock.FinancialInfo.npMargin'), data: npMarginData }
    ];

    // Prepare dataset for LineChart
    const yAxisLineChart = [
      { name: t('Stock.FinancialInfo.opGrowth'), data: opGrowthData, yAxis: 1 },
      { name: t('Stock.FinancialInfo.rGrowth'), data: rGrowthData }
    ];

    // oMargin and npMargin - add them to the bar graph as line graph
    // rGrowth and opGrowth - two lines graph in one space
    return (
      <div id="financial">
        <h6>* {t('Stock.FinancialInfo.hide')}</h6>
        <h3>{t('Stock.FinancialInfo.chart-title-1')}</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={BarChartOption(dates, yAxisBarChart, label)}
        />
        <div id="seperator"></div>
        <h3>{t('Stock.FinancialInfo.chart-title-2')}</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={LineChartOption(dates, yAxisLineChart)}
        />
      </div>
    );
  }
};

export default FinancialInfo;
