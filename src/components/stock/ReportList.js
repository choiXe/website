import React from 'react';

import { numSeperator, slicer } from '../tools/formatter';
import { reportUrl } from '../tools/constants';

import './ReportList.scss';

const ReportInfo = ({ data, stockName }) => {
  var analyst;

  if (data.analyst.length > 3) {
    analyst = data.analyst.substr(0,3) + ' 등';
  } else {
    analyst = data.analyst;
  }

  return (
    <div className="report-item">
      <div>{data.date}</div>
      <div>
        <a href={reportUrl + data.reportIdx} rel="noreferrer" target="_blank">
          {data.reportName === '' ? stockName : slicer(data.reportName, 23)}
        </a>
      </div>
      <div>{analyst}</div>
      <div>{numSeperator(data.priceGoal)}</div>
      <div>{data.firm}</div>
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
