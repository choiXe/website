import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import wordCloud from "highcharts/modules/wordcloud.js";

const WordCloud = ({ newsTitles }) => {
  wordCloud(Highcharts);
  Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = 
    function(relativeWeight) {
      const maxFontSize = 25;

      return Math.floor(maxFontSize * relativeWeight);
    };

  const text = 
  newsTitles,
  lines = text.split(/[,\. ]+/g),
  allData = Highcharts.reduce(lines, function (arr, word) {
    let obj = Highcharts.find(arr, function (obj) {
      return obj.name === word;
    });
    if (obj) {
      obj.weight += 1;
    } else {
      obj = {
        name: word,
        weight: 1
      };
      arr.push(obj);
    }
    return arr;
  }, []);

  const selectedData = [];
  for (const item of allData) {
    if (item.weight > 3) {
      selectedData.push(item);
    }
  }

  const options = {
    chart: {
      //height: (9 / 16 * 100) + '%'
      height: '50%',
      borderRadius: 14,
      shadow: {
        color: '#BFD1C6',
        offsetX: 2,
        offsetY: 2,
        opacity: 2,
        width: 2
      }
    },
    series: [{
      rotation: {
        from: 0,
        //to: 60,
        orientations: 1
      },
      type: "wordcloud",
      data: selectedData,
    }]
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default WordCloud;
