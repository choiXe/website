import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StockChart from './StockChart';
import InvStatList from './InvStatList';
import ReportList from './ReportList';
import NewsList from './NewsList';

import data from '../../services/data';
import './Stock.scss';

const Stock = ({ location }) => {
  const [listType, setListType] = useState("analyst");
  const [stockData, setStockData] = useState(null);
  const stockId = location.state

  useEffect(() => {
    window.scrollTo(0, 0);
    const foo = async () => {
      const info = await data.getStockInfo(stockId, "2021-06-01");
      setStockData(info.getStockInfo);
    }
    foo();
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

    return (
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
            <h1 className='yield'>{stockData.expYield+"%"}</h1>
            <div className="price-container">
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
          <div className="chart-section">
            <div className="chart-stat">
              <div className="stat-item">
                <p>시: undecided</p>
              </div>
              <div className="stat-item">
                <p>고: undecided</p>
              </div>
              <div className="stat-item">
                <p>저: undecided</p>
              </div>
              <div className="stat-item">
                <p>변동(%): <span>{stockData.changeRate+"%"}</span>
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
    );
  }
};

export default Stock;
