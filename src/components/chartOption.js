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
    chart: {
      type: 'treemap',
      backgroundColor: null,
      height: (1 / 2) * 100 + '%'
    },
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
      height: '58%',
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

export function BarChartOption(x, y, label) {
  const barChartNames = [
    '매출',
    '영업이익',
    '순이익',
    'Revenue',
    'Operating Profit',
    'Net Profit'
  ];
  return {
    chart: {
      zoomType: 'xy',
      height: (9 / 16) * 100 + '%'
    },
    exporting: { enabled: false },
    title: false,
    credits: false,
    xAxis: { categories: x, crosshair: true },
    yAxis: [
      {
        // Primary yAxis
        labels: { format: '{value}%' },
        title: false,
        opposite: true
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        labels: {
          formatter: function () {
            const adjusted =
              this.value.toString().length >= 13
                ? this.value / 1000000000000
                : this.value / 100000000;
            const unit = this.value.toString().length >= 13 ? '조' : '억';
            return adjusted.toString() + unit;
          }
        },
        title: false
      }
    ],
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        var s = '<b style="font-size:10px">' + this.x + '</b></br><td>';
        for (let i = 0; i < this.points.length; i++) {
          if (barChartNames.indexOf(this.points[i].series.name) !== -1) {
            s +=
              this.points[i].series.name +
              ': </td><td style="padding:0"><b>' +
              label[this.points[i].y] +
              '</b></td>';
          } else {
            s +=
              this.points[i].series.name +
              ': </td><td style="padding:0"><b>' +
              this.points[i].y +
              '%</b></td>';
          }
          if (i < this.points.length - 1) {
            s += '</br>';
          }
        }
        return s;
      }
    },
    series: y,
    colors: ['#47b6d1', '#ff6868', '#ffd602', '#5f86db', '#e34489']
  };
}

export function LineChartOption(x, y) {
  return {
    exporting: { enabled: false },
    title: false,
    credits: false,
    chart: {
      type: 'line',
      height: (9 / 16) * 100 + '%'
    },
    yAxis: [
      {
        // Primary yAxis
        labels: { format: '{value}%', style: { color: '#ff6868' } },
        title: false,
        opposite: true
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        labels: { format: '{value}%', style: { color: '#47b6d1' } },
        title: false
      }
    ],
    plotOptions: {
      series: { label: { connectorAllowed: false }, pointStart: parseInt(x[0]) }
    },
    series: y,
    tooltip: {
      formatter: function () {
        var s = '<b style="font-size:10px">' + this.x + '</b>';
        for (let i = 0; i < this.points.length; i++) {
          s +=
            '</br><td>' +
            this.points[i].series.name +
            ': </td>' +
            '<td style="padding:0"><b>' +
            this.points[i].y +
            '%</b></td>';
        }
        return s;
      },
      shared: true,
      useHTML: true
    },
    colors: ['#47b6d1', '#ff6868', '#ffd602', '#5f86db', '#e34489']
  };
}
