import React from 'react';

import './StockList.scss';

const StockInfo = ({ stock }) => {
  const numbWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="stock-item">
      <div>
        {stock.stockName}
      </div>
      <div>
        {numbWithCommas(stock.tradePrice)}
      </div>
      <div>
        {stock.changeRate}%
      </div>
      <div>
        {numbWithCommas(stock.priceAvg)}
      </div>
      <div>
        {stock.expYield}%
      </div>
      <div>
        graph
      </div>
      <div style={stock.score>=30 ? {color: "green"} : {color: "red"}}>
        {stock.score}
      </div>
    </div>
  )
}

const StockList = ({ stocks }) => {
  return (
    <>
      {stocks.map(stock => (
        <StockInfo key={stock.stockName} stock={stock} />
      ))}
    </>
  )
}

export default StockList;
