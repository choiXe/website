import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import chartOption from '../charts/chartOption';

import InvStatList from './InvStatList';
import ReportList from './ReportList';
import NewsList from './NewsList';

import data from '../../services/data';
import './Stock.scss';

const Stock = ({ location }) => {
  const [myList, setMyList] = useState("애널리스트 리포트");
  const [stockData, setStockData] = useState(null);
  const stockId = location.state
  
  useEffect(() => {
    window.scrollTo(0, 0);
    data.getStockInfo(stockId, "2021-06-01")
      .then(info => setStockData(info.data.getStockInfo));
  },[]);

  if (!stockData) {
    return <h1 style={{textAlign:"center"}}>Loading...</h1>;
  } else {
    const Highlight = ({ active, count, onClick }) => {
      return (
        <div onClick={onClick} className={active ? "active" : "inactive"}>
          {count}
        </div>
      );
    };
  
    const showList = () => {
      return (
        <div>
          {["애널리스트 리포트", "뉴스"].map(t => (
            <Highlight
              key={t}
              count={t}
              active={t === myList}
              onClick={() => setMyList(t)}
            />
          ))}
        </div>
      );
    };
  
    function numbWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
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
      );
    };
  
    const invStatTitle = ['날짜', '개인', '외국인', '기관'];
    const reportTitle = ['날짜', '제목', '애널리스트', '목표가 (₩)', '제공출처'];
    const newsTitle = ['날짜', '제목'];
    const titleList = myList === "애널리스트 리포트" ? reportTitle : newsTitle;
  
    return (
      <div className='Stock-container'>
        <h2 style={{marginBottom: '2%'}}>{stockData.name}</h2>
        
        <div className='Stock-top-container'>
          <div className='Stock-top-left-container'>
            <div className='Stock-top-left-text-container'>
              <p>기대 수익률 (3개월)</p>
              <h1 className='Stock-top-left-yield-container'>{stockData.expYield + "%"}</h1>
  
              <div className='Stock-top-left-price-container'>
                <div>
                  <p>현재가</p>
                  <h4>{numbWithCommas(stockData.tradePrice)}</h4>
                </div>
                <div>
                  <p>컨센서스 평균가</p>
                  <h4>{numbWithCommas(stockData.priceAvg)}</h4>
                </div>  
              </div>
            </div>
  
            <div className='Stock-top-left-graph-container'>
              <p>{"변동(%): " + stockData.changeRate + "%"}</p>
              <div>{showGraph(stockData.pastData)}</div>
            </div>
          </div>
  
          <div className='Stock-top-right-container'>
            <h4 className='Stock-top-right-title-container'>투자정보</h4>
            <h5 className='Stock-top-right-subtitle-container'>시가총액</h5> 
            <p>{stockData.marketCap}</p>
            <h5 className='Stock-top-right-subtitle-container'>52주 최고가</h5>
            <p>{numbWithCommas(stockData.high52wPrice)}</p>
            <h5 className='Stock-top-right-subtitle-container'>52주 최저가</h5>
            <p>{numbWithCommas(stockData.low52wPrice)}</p>
            <h5 className='Stock-top-right-subtitle-container'>외국인 소진율</h5>
            <p>{stockData.foreignRatio + "%"}</p>
            <h5 className='Stock-top-right-subtitle-container'>PER</h5>
            <p>{stockData.per + "배"}</p>
            <h5 className='Stock-top-right-subtitle-container'>PBR</h5>
            <p>{stockData.pbr + "배"}</p>
            <h5 className='Stock-top-right-subtitle-container'>ROE</h5>
            <p>{stockData.roe + "%"}</p>
          </div>
        </div>
  
        <div className='Stock-company-info'>
          <h4 className='Stock-company-info-title'>기업정보</h4>
          <p>{stockData.companySummary}</p>
        </div>
  
        <div className='Stock-bottom-container'>
          <div className='Stock-invStat-container'>
            <div className='Stock-invStat-title-container'>
              {invStatTitle.map(title => <div key={title}> {title}</div>)}
            </div>
            <div className='Stock-invStat-data-container'>
              <InvStatList dataSet={stockData.invStatistics}/>
            </div>
          </div>
  
          <div className='Stock-report-container'>
            <div className='Stock-newsReport-button-list'>
              {showList()}
            </div>
            <div className='Stock-report-title-container'>
              {titleList.map(title => <div key={title}> {title}</div>)}
            </div>
            <div className='Stock-report-data-container'>
              {myList === "애널리스트 리포트"
                ? <ReportList dataSet={stockData.reportList}/>
                : <NewsList dataSet={stockData.news}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Stock;
