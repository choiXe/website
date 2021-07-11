export default function ChartOption(ohlc, volume, groupingUnits) {
    return {
      rangeSelector: { selected: 1 },
      xAxis: {
        labels: {
          format: '{value:%m/%d}'
        }
      },
      yAxis: [{
        labels: { align: 'right', x: -3, format: '{value}' },
        title: { text: '캔들차트' },
        height: '60%',
        lineWidth: 2,
        resize: { enabled: true }
        }, {
        labels: { align: 'right', x: -3, format: '{value}' },
        title: { text: '거래량' },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      series: [{
        type: 'candlestick',
        name: '가격',
        data: ohlc,
        dataGrouping: { units: groupingUnits }
      }, {
        type: 'column',
        name: '거래량',
        data: volume,
        yAxis: 1,
        dataGrouping: { units: groupingUnits }
      }],
      tooltip: { split: true },
      plotOptions: {
        candlestick: {
          upColor: '#E21414',
          lineColor: '#666666'
        }
      },
      credits: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      colors: ["#246DED", "#434348", "#90ed7d", "#f7a35c", "#8085e9",
       "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
    };
  };

  