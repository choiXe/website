import React from 'react';
import './ReportList.scss';

const ReportInfo = ({ data, stockName }) => {
  const numbWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const reportName = data.reportName.length > 21 
  ? data.reportName.slice(0, 21) + "..." 
  : data.reportName;
  const baseURL = "http://consensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=";

  const analystList = data.analyst.split(",");
  var analyst;
  if (analystList.length === 2) {
    analyst = analystList[0] + ", " + analystList[1];
  } else if (analystList.length >= 3) {
    analyst = analystList[0] + " 등";
  } else {
    analyst = analystList[0];
  };

  const priceGoal = numbWithCommas(data.priceGoal);
  const firm = data.firm;

  return (
    <div className="report-item">
      <div>
        {data.date}
      </div>
      <div>
        <a href={baseURL + data.reportIdx} rel="noreferrer" target="_blank">
          {reportName==="" ? stockName : reportName}
        </a>
      </div>
      <div>
        {analyst}
      </div>
      <div>
        {priceGoal}
      </div>
      <div>
        {firm}
      </div>
    </div>
  )
}

const ReportList = ({ dataSet, stockName }) => {
  return (
    <>
      {dataSet.map(data => (
        <ReportInfo key={data.reportIdx} data={data} stockName={stockName} />
      ))}
      </>
  )
}

export default ReportList;
