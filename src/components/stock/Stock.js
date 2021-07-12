import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StockChart from './StockChart';
import InvStatList from './InvStatList';
import ReportList from './ReportList';
import NewsList from './NewsList';
import WordCloud from './WordCloud';

import data from '../../services/data';
import './Stock.scss';

const Stock = ({ location }) => {
  const [listType, setListType] = useState("analyst");
  const [stockData, setStockData] = useState(null);
  const daysPassed = 30;
  const stockId = location.state

  const getPastDate = n => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const startDate = getPastDate(daysPassed);
    data.getStockInfo(stockId, startDate)
      .then(data => setStockData(data.getStockInfo));
  },[stockId]);

  const numbWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!stockData) {
    return <h1 style={{textAlign:"center"}}>Loading...</h1>;
  } else {
    const invStatTitle = ['날짜', '개인', '외국인', '기관'];
    const reportTitle = ['날짜', '제목', '애널리스트', '목표가 (₩)', '제공출처'];
    const newsTitle = ['날짜', '제목'];
    const titleList = listType === "analyst" ? reportTitle : newsTitle;
    const statColor = stockData.changeRate>=0 ? 'red' : 'blue';

    return (
      <div>
        <div className="stock-container">
          <h1 className="stockname">
            <div className="name">{stockData.name}</div>
            <div className="id">{stockId}</div>
          </h1>
          <Link to="/" className="return-button">
            <span className="symbol">{"<"}</span> 돌아가기
          </Link>
          <div className="stock-chart-container">
            <div className="numbers">
              <p>기대 수익률 (3개월) </p>
              <h1 className='yield' style={{color: stockData.expYield>0 ? "red" : "blue"}}>
                {Math.round(stockData.expYield)+"%"}
              </h1>
              <div className="price-container">
                <div>
                  <p>현재가</p>
                  <h4>{numbWithCommas(stockData.tradePrice)}</h4>
                </div>
                <div>
                  <p>컨센서스 평균가</p>
                  <h4>{stockData.priceAvg !== '의견 없음' ? numbWithCommas(stockData.priceAvg) : stockData.priceAvg}</h4>
                </div>  
              </div>
            </div>
            <div className="chart-section">
              <div className="chart-stat">
                <div className="stat-item">
                  <p>시: {numbWithCommas(stockData.openingPrice)}</p>
                </div>
                <div className="stat-item">
                  <p>고: {numbWithCommas(stockData.highPrice)}</p>
                </div>
                <div className="stat-item">
                  <p>저: {numbWithCommas(stockData.lowPrice)}</p>
                </div>
                <div className="stat-item">
                  <p>변동: 
                    <span className={statColor}>
                      {" " + numbWithCommas(stockData.changePrice)}
                    </span>
                  </p>
                </div>
                <div className="stat-item">
                  <p>변동(%): 
                    <span className={statColor}>
                      {(stockData.changeRate>=0 ? " +" : " ")+stockData.changeRate+"%"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="chart">
                <StockChart data={stockData.pastData}/>
              </div>
            </div>
          </div>
          <div className="invinfo-container">
            <h4>투자정보</h4>
            <div className="invinfo-items">
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
          <div className="companyinfo-container">
            <h4>기업정보 <span>{"WICS: " + stockData.wicsSectorName}</span></h4>
            <p>{stockData.companySummary}</p>
          </div>
          <div className="invstat-container">
            <div className="invstat-description">투자자 동향</div>
            <div className="invstat-title">
              {invStatTitle.map(title => <div key={title}>{title}</div>)}
            </div>
            <div className="invstat-list">
              <InvStatList dataSet={stockData.invStatistics} />
            </div>
          </div>
          <div className="wordcloud-container">
            <WordCloud newsTitles={stockData.newsTitles}/>
          </div>
          <div className="list-table-container">
            <div className="list-button">
              <button className={listType==="analyst" ? "active" : ""}
                onClick={(e)=>{setListType("analyst")}}
              >
                애널리스트 리포트
              </button>
              <button className={listType==="news" ? "active" : ""}
                onClick={(e)=>{setListType("news")}}
              >
                뉴스
              </button>
            </div>
            <div className="list-table">
              <div className={listType==="analyst" 
                ? "list-title analyst" : "list-title news"}>
                {titleList.map(title => <div key={title}> {title}</div>)}
              </div>
              <div className="content">
                {listType==="analyst" 
                ? <ReportList dataSet={stockData.reportList} 
                  stockName={stockData.name}/> 
                : <NewsList dataSet={stockData.news} />}
              </div>
            </div>
          </div>
        </div>
        <p>hi</p>
      </div>
    );
  }
};

export default Stock;
