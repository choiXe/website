import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import wordCloud from "highcharts/modules/wordcloud.js";

import { WordCloudOption } from "../chartOption";

const WordCloud = ({ newsTitles }) => {
  wordCloud(Highcharts);

  const text = newsTitles,
    lines = text.split(/[,. ]+/g),
    allData = Highcharts.reduce(
      lines,
      function (arr, word) {
        let obj = Highcharts.find(arr, function (obj) {
          return obj.name === word;
        });
        if (obj) {
          obj.weight += 1;
        } else {
          if (word.length > 1) {
            obj = {
              name: word,
              weight: 1,
            };
            arr.push(obj);
          }
        }
        return arr;
      },
      []
    );

  const selectedData = [];
  for (const item of allData) {
    if (item.weight > 7) {
      selectedData.push(item);
    }
  }

  const options = WordCloudOption(selectedData);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WordCloud;
