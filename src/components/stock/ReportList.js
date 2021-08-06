import React from 'react';

import { numSeperator, slicer } from '../tools/formatter';
import { reportUrl } from '../tools/constants';

import './ReportList.scss';

const ReportInfo = ({ data, stockName }) => {
  var analyst;

  if (data.analyst.length > 3) {
    analyst = data.analyst.substr(0, 3) + ' 등';
  } else {
    analyst = data.analyst;
  }

  return (
    <div className="report-item">
      <div id="date">{data.date}</div>
      <div id="report">
        <a href={reportUrl + data.reportIdx} rel="noreferrer" target="_blank">
          {data.reportName === '' ? stockName : slicer(data.reportName, 23)}
        </a>
      </div>
      <div id="mobile">
        <h4><a href={reportUrl + data.reportIdx} rel="noreferrer" target="_blank">
          {data.reportName === '' ? stockName : data.reportName}
        </a></h4>
        <h5>{data.date} | {data.firm} | {data.analyst.replace(',', ', ')}</h5>
      </div>
      <div id="analyst">{analyst}</div>
      <div id="price">{numSeperator(data.priceGoal)}</div>
      <div id="firm">{data.firm}</div>
    </div>
  );
};

const ReportList = ({ dataSet, stockName }) => {
  return (
    <>
      {dataSet.map((data) => (
        <ReportInfo key={data.reportIdx} data={data} stockName={stockName} />
      ))}
    </>
  );
};

export default ReportList;
