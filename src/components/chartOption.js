export default function ChartOption(ohlc, volume, groupingUnits) {
    return {
      rangeSelector: { selected: 1 },
      yAxis: [{
        labels: { align: 'right', x: -3},
        title: { text: 'OHLC'},
        height: '60%',
        lineWidth: 2,
        resize: { enabled: true }
      }, {
        labels: { align: 'right', x: -3 },
        title: { text: 'Volume' },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      tooltip: { split: true },
      series: [{
        type: 'candlestick',
        name: 'My Stock',
        data: ohlc,
        dataGrouping: { units: groupingUnits }
      }, {
        type: 'column',
        name: 'Volume',
        data: volume,
        yAxis: 1,
        dataGrouping: { units: groupingUnits }
      }]
    };
  };

  