import React from 'react';

import './StockList.scss';

const StockInfo = ({ stock }) => {
  return (
    <div className="stock-item">
      <div>
        {stock.stockName}
      </div>
      <div>
        {stock.tradePrice}
      </div>
      <div>
        {stock.expYield}
      </div>
      <div>
        {stock.priceAvg}
      </div>
      <div>
        {stock.changeRate}
      </div>
      <div>
        graph
      </div>
      <div>
        O
      </div>
    </div>
  )
}

const StockList = ({ stocks }) => {
  return (
    <div className="stocklist">
      {stocks.map(stock => (
        <StockInfo key={stock.stockName} stock={stock} />
      ))}
    </div>
  )
}

export default StockList;
