import { useTranslation } from 'react-i18next';

export function StockChartOption(ohlc, volume, groupingUnits) {
  const { t } = useTranslation();
  return {
    rangeSelector: {
      selected: 1,
      inputEnabled: false,
      buttonTheme: {
        fill: 'none',
        stroke: 'none',
        r: 10,
        style: {
          color: '#2A2F47',
          fontWeight: 'bold'
        },
        states: {
          hover: {},
          select: {
            fill: '#2A2F47',
            style: {
              color: 'white'
            }
          }
        }
      }
    },
    xAxis: {
      labels: {
        format: '{value:%m/%d}'
      }
    },
    yAxis: [
      {
        labels: { align: 'right', x: -3, format: '{value}' },
        title: { text: t('Stock.Highchart.candle') },
        height: '60%',
        lineWidth: 2,
        resize: { enabled: true }
      },
      {
        labels: { align: 'right', x: -3, format: '{value}' },
        title: { text: t('Stock.Highchart.volume') },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }
    ],
    series: [
      {
        type: 'candlestick',
        name: t('Stock.Highchart.price'),
        data: ohlc,
        dataGrouping: { units: groupingUnits }
      },
      {
        type: 'column',
        name: t('Stock.Highchart.volume'),
        data: volume,
        yAxis: 1,
        dataGrouping: { units: groupingUnits }
      }
    ],
    tooltip: { split: true },
    plotOptions: {
      candlestick: {
        upColor: '#E21414',
        lineColor: '#666666'
      }
    },
    credits: false,
    navigator: false,
    scrollbar: false,
    colors: [
      '#246DED',
      '#434348',
      '#90ed7d',
      '#f7a35c',
      '#8085e9',
      '#f15c80',
      '#e4d354',
      '#2b908f',
      '#f45b5b',
      '#91e8e1'
    ]
  };
}

export function TreeMapOption(data, selectHandler) {
  return {
    chart: { type: 'treemap', backgroundColor: null },
    exporting: { enabled: false },
    series: [
      {
        layoutAlgorithm: 'squarified',
        allowDrillToNode: true,
        animation: false,
        dataLabels: { enabled: false },
        levelIsConstant: false,
        levels: [
          {
            level: 1,
            dataLabels: { enabled: true },
            borderWidth: 3
          }
        ],
        data: data
      }
    ],
    title: false,
    credits: false,
    plotOptions: {
      treemap: {
        borderColor: '#2A2F47',
        dataLabels: {
          style: {
            fontSize: '14px'
          }
        },
        events: {
          click: function (event) {
            if (event.point.node.childrenTotal !== 0) {
              selectHandler(event.point.name);
            }
          },
          setRootNode: function (event) {
            if (event.newRootId === '') {
              selectHandler(null);
            }
          }
        }
      }
    }
  };
}

export function WordCloudOption(data) {
  return {
    exporting: { enabled: false },
    chart: {
      height: '57%',
      borderRadius: 14,
      shadow: {
        color: '#BFD1C6',
        offsetX: 2,
        offsetY: 2,
        opacity: 2,
        width: 2
      },
      margin: '30'
    },
    series: [
      {
        rotation: {
          from: 0,
          orientations: 1
        },
        type: 'wordcloud',
        data: data
      }
    ],
    plotOptions: {
      wordcloud: {
        minFontSize: 7
      }
    },
    title: false,
    credits: false
  };
}

export function BarChartOption(x, y) {
  return {
    exporting: { enabled: false },
    title: false,
    credits: false,
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: x,
      crosshair: true
    },
    yAxis: {
      title: {text: '원'},
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {pointPadding: 0.2, borderWidth: 0}
    },
    series: y
  };
}
