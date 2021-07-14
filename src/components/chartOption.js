export function StockChartOption(ohlc, volume, groupingUnits) {
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
          hover: {
          },
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
    credits: false,
    navigator: false,
    scrollbar: false,
    colors: ["#246DED", "#434348", "#90ed7d", "#f7a35c", "#8085e9",
      "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
  };
};

export function TreeMapOption(data) {
  return {
    chart: { type: 'treemap', backgroundColor: null},
    exporting: { enabled: false },
    series: [{
      layoutAlgorithm: "squarified",
      allowDrillToNode: true,
      animation: false,
      dataLabels: { enabled: false },
      levelIsConstant: false,
      levels: [{
        level: 1,
        dataLabels: { enabled: true },
        borderWidth: 3
      }],
      data: data
    }],
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
            // event.point.name 이름
            // 섹터가 아닌 종목일 경우 event.point.node.childrenTotal 이 0임
          }
        }
      }
    }
  };
};

export function WordCloudOption(data) {
  return {
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
    series: [{
      rotation: {
        from: 0,
        orientations: 1
      },
      type: 'wordcloud',
      data: data,
    }],
    plotOptions: {
      wordcloud: {
        minFontSize: 7
      }
    },
    title: false,
    credits: false
  };
}