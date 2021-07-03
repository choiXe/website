import React, { Fragment } from 'react';
import './Stock.css';
import Table from './Table';

const Stock = props => {
  const { state } = props.location
  let data = state.data.getStockInfo;

  // 그래프 컨테이너 
  // 그래프: data.pastData
  // 변동 (%): data.changeRate (0.7%)

  // 애널리스트 리포트: data.reportList
      // http://consensus.hankyung.com/apps.analysis/analysis.downpdf?report_idx=
      // 이름.split('투자')[0].split('증권')
  // 뉴스: data.news (flatlist format)

  function numbWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var invStatData = [];
  for (let i = 0; i < data.invStatistics.length; i++) {
    let temp = {date: "", individual: "", foreign: "", institutions: ""};
    let month = parseInt(data.invStatistics[i].date.split("-")[1]);
    let day = parseInt(data.invStatistics[i].date.split("-")[2]);

    temp.date = month.toString() + "." + day.toString();
    temp.individual = data.invStatistics[i].inKR.individual;
    temp.foreign = data.invStatistics[i].inKR.foreign;
    temp.institutions = data.invStatistics[i].inKR.institutions;
    invStatData.push(temp);
  }

  return (
    <div className="myStockContainer">
      <h2 style={{marginBottom: '2%'}}>{data.name}</h2>
      <div className="top-container">
        <div className='company-summary'>
          <div style={{flexDirection: 'column', width: "20%"}}>
            <p style={{color:'gray'}}>기대 수익률 (3개월)</p>
            <h1 style={{fontSize: 45, color: '#D03553'}}>{data.expYield + "%"}</h1>

            <div style={{display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
              <div>
                <p style={{paddingBottom: '5%', color:'gray'}}>현재가</p>
                <p style={{fontWeight: 'bold'}}>{numbWithCommas(data.tradePrice)}</p>
              </div>
              <div style={{marginLeft: '10%'}}>
                <p style={{paddingBottom: '5%', color:'gray'}}>컨센서스 평균가</p>
                <p style={{fontWeight: 'bold'}}>{numbWithCommas(data.priceAvg)}</p>
              </div>
            </div>
  
          </div>
          <div className='right-data' style={{marginLeft: '40%'}}>
            <p>그래프</p>
          </div>
        </div>
        <div className='investment-data'>
          <p style={{fontSize: 18, fontWeight: 'bold', paddingBottom: '8%', paddingTop: '4%'}}>투자정보</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>시가총액</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{data.marketCap}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>52주 최고가</p>
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{numbWithCommas(data.high52wPrice)}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>52주 최저가</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{numbWithCommas(data.low52wPrice)}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>외국인 소진율</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{data.foreignRatio + "%"}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>PER</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{data.per + "배"}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>PBR</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{data.pbr + "배"}</p>
          <p style={{fontSize: 14, paddingBottom: '2%', color: 'gray'}}>ROE</p> 
          <p style={{fontSize: 17, paddingBottom: '5%'}}>{data.roe + "%"}</p>
        </div>
      </div>

      <div className='company-info' style={{paddingLeft: '2%', paddingRight: '2%', marginBottom: '3%'}}>
      <p style={{fontSize: 16, fontWeight: 'bold', paddingTop: '1%', lineHeight: '160%'}}>기업정보</p>
        <p style={{fontSize: 14, paddingLeft: '2%', lineHeight: '160%', paddingBottom: '1%'}}>{data.companySummary}</p>
      </div>

      <div className="bottom-container">
        <div className='invStatistics'>
          <Fragment>
            <Table
              tableData={invStatData}
              headingColumns={['날짜', '개인', '외국인', '기관']}   
            />
          </Fragment>
        </div>
        <div className='news-report'>
          <Fragment>
            <Table
              tableData={data.reportList}
              headingColumns={['날짜', '제목', '애널리스트', '목표가 (₩)', '제공출처']}   
            />
          </Fragment>
        </div>
      </div>
      
    </div>
  );
};

export default Stock;
