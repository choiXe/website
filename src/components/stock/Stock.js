import React, { Fragment, useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import Table from './Table';

import './Stock.scss';
import chartOption from '../charts/chartOption';

import data from '../../services/data';

const Stock = ({ location }) => {
  const [stockData, setStockData] = useState(null);
  const stockId = location.state

  useEffect(() => {
    window.scrollTo(0, 0);
    data.getStockInfo(stockId, "2021-06-01")
      .then(info => setStockData(info.data.getStockInfo));
  },[]);

  // 그래프 컨테이너 
  // 그래프: data.pastData
  // 변동 (%): data.changeRate (0.7%)

  // 애널리스트 리포트: data.reportList
  // http://consensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=
  // 뉴스: data.news (flatlist format)

  function numbWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function showGraph(data) {
    var ohlc = [],
      volume = [],
      dataLength = data.length,
      groupingUnits = [['week', [1]], ['month', [1, 2, 3, 4, 6]]],
      i = 0;

    for (i; i < dataLength; i += 1) {
      let tempDate = new Date(data[i].date);
      // date, open, high, low, close
      ohlc.push([Date.parse(tempDate), data[i].start, data[i].high, data[i].low, data[i].end]);
      // date, volume
      volume.push([Date.parse(tempDate), data[i].volume]);
    };


    const options = chartOption(ohlc, volume, groupingUnits);

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options}
      />
    )
  };

  if (!stockData) {
    return <h1 style={{textAlign:"center"}}>Loading...</h1>;
  } else {
    var invStatData = [];
    for (let i = 0; i < stockData.invStatistics.length; i++) {
      let temp = {date: "", individual: "", foreign: "", institutions: ""};
      let month = parseInt(stockData.invStatistics[i].date.split("-")[1]);
      let day = parseInt(stockData.invStatistics[i].date.split("-")[2]);

      temp.date = month.toString() + "." + day.toString();
      temp.individual = stockData.invStatistics[i].inKR.individual;
      temp.foreign = stockData.invStatistics[i].inKR.foreign;
      temp.institutions = stockData.invStatistics[i].inKR.institutions;
      invStatData.push(temp);
    }

    var reportData = [];
    for (let i = 0; i < stockData.reportList.length; i++) {
      let temp = {date: "", reportName: "", analyst: "", priceGoal: "", firm: ""};

      temp.date = stockData.reportList[i].date;
      temp.reportName = stockData.reportList[i].reportName.length > 30 
        ? stockData.reportList[i].reportName.slice(0, 30) + "..." 
        : stockData.reportList[i].reportName;

      let analystList = stockData.reportList[i].analyst.split(",");
      if (analystList.length === 2) {
        temp.analyst = analystList[0] + ", " + analystList[1];
      } else if (analystList.length >= 3) {
        temp.analyst = analystList[0] + " 등";
      } else {
        temp.analyst = analystList[0];
      }

      temp.priceGoal = numbWithCommas(stockData.reportList[i].priceGoal);
      temp.firm = stockData.reportList[i].firm.split('투자')[0].split('증권')
      reportData.push(temp);
    }

    return (
      <div className="myStockContainer">
        <h2 style={{marginBottom: '2%'}}>{stockData.name}</h2>
        <div className="top-container">
          <div className='company-summary'>

            <div style={{flexDirection: 'column', width: "20%"}}>

              <p style={{color:'gray'}}>기대 수익률 (3개월)</p>
              <h1 style={{fontSize: 45, color: '#D03553'}}>{stockData.expYield + "%"}</h1>
              <div style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
                <div>
                  <p style={{paddingBottom: '5%', color:'gray'}}>현재가</p>
                  <p style={{fontWeight: 'bold'}}>{numbWithCommas(stockData.tradePrice)}</p>
                </div>
                <div style={{marginLeft: '10%'}}>
                  <p style={{paddingBottom: '5%', color:'gray'}}>컨센서스 평균가</p>
                  <p style={{fontWeight: 'bold'}}>{numbWithCommas(stockData.priceAvg)}</p>
                </div>
              </div>

            </div>
            <div className='right-data' style={{marginLeft: '10%'}}>

              <div id="tempContainer">
                {showGraph(stockData.pastData)}
              </div>

            </div>

          </div>
          <div className='investment-data'>
            <p style={{fontSize: 18, fontWeight: 'bold', paddingBottom: '8%', paddingTop: '4%'}}>투자정보</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>시가총액</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{stockData.marketCap}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>52주 최고가</p>
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{numbWithCommas(stockData.high52wPrice)}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>52주 최저가</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{numbWithCommas(stockData.low52wPrice)}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>외국인 소진율</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{stockData.foreignRatio + "%"}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>PER</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{stockData.per + "배"}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>PBR</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{stockData.pbr + "배"}</p>
            <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>ROE</p> 
            <p style={{fontSize: 17, paddingBottom: '5%'}}>{stockData.roe + "%"}</p>
          </div>
        </div>

        <div className='company-info' style={{paddingLeft: '2%', paddingRight: '2%', marginBottom: '3%'}}>
          <p style={{fontSize: 16, fontWeight: 'bold', paddingTop: '1%', lineHeight: '160%'}}>기업정보</p>
          <p style={{fontSize: 14, paddingLeft: '2%', lineHeight: '160%', paddingBottom: '1%'}}>{stockData.companySummary}</p>
        </div>

        <div className="bottom-container">

          <div className='invStatistics'>
            <Fragment>
              <Table
                title="invStatistics"
                tableData={invStatData}
                headingColumns={['날짜', '개인', '외국인', '기관']}   
              />
            </Fragment>
          </div>
          <div className='news-report'>
            <Fragment>
              <Table
                title="news-report"
                tableData={reportData}
                headingColumns={['날짜', '제목', '애널리스트', '목표가 (₩)', '제공출처']}   
              />
            </Fragment>
          </div>

        </div>
      </div>
    );
  }
};

export default Stock;
