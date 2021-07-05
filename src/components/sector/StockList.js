import React from 'react';
import { Link } from 'react-router-dom';

import './StockList.scss';

const StockInfo = ({ stock }) => {
  const numbWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Link to={{pathname: '/stock', state: stock.stockId}} className="stock-item">
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
    </Link>
  )
}

const StockList = ({ stocks }) => {
  stocks.sort((a, b) => b.expYield - a.expYield);
  return (
    <>
      {stocks.map(stock => (
        <StockInfo key={stock.stockName} stock={stock} />
      ))}
    </>
  )
}

export default StockList;
