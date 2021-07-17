import React from 'react';

import "./StockMarket.scss";

const StockMarket = ({ data }) => {
  console.log(data.kr);
  return (
    <>
      <h4>국내증시</h4>
      <div id="market-title">
        <div></div>
        <div>현재가</div>
        <div>변동</div>
        <div>변동률</div>
      </div>
      <div className="market-table">
        {data.kr.map(item => (
          <div key={item.symbolCode}>
            <p>item.name</p>
            <p>item.price</p>
            <p>item.change</p>
            <p>item.changeRate</p>
          </div>
        ))}
      </div>
      <h4>해외증시</h4>
      <div className="market-table">
        {data.global.map(item => (
          <div key={item.symbolCode}>
            <p>item.name</p>
            <p>item.price</p>
            <p>item.change</p>
            <p>item.changeRate</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default StockMarket;
