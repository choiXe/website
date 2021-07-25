import React from 'react';
import { Link } from 'react-router-dom';

import { numSeperator, calColor } from '../tools/formatter';

import './StockList.scss';

const StockInfo = ({ stock }) => {
  return (
    <Link
      to={
        stock.stockName !== '데이터 없음'
          ? {
              pathname: '/stock',
              state: {
                stockId: stock.stockId,
                stockName: stock.stockName
              }
            }
          : { pathname: '/' }
      }
      className="stock-item"
    >
      <div className="name">{stock.stockName}</div>
      <div>{numSeperator(stock.tradePrice)}</div>
      <div style={calColor(stock.changePrice, 0)}>
        {stock.changePrice >= 0
          ? '▲ ' + numSeperator(stock.changePrice)
          : '▼ ' + numSeperator(stock.changePrice).replace('-', '')}
      </div>
      <div style={calColor(stock.changeRate, 0)}>
        {stock.changeRate > 0 ? '+' + stock.changeRate : stock.changeRate}%
      </div>
      <div>{numSeperator(stock.priceAvg)}</div>
      <div style={calColor(stock.expYield, 0)}>
        {stock.expYield > 0 ? '+' + stock.expYield : stock.expYield}%
      </div>
      <div style={stock.score >= 50 ? { color: 'green' } : { color: 'red' }}>
        {stock.score}
      </div>
    </Link>
  );
};

const StockList = ({ stocks, order }) => {
  if (order === 'yield') {
    stocks.sort((a, b) => b.expYield - a.expYield);
  } else {
    stocks.sort((a, b) => (b.score === '-' ? -1 : b.score - a.score));
  }

  return (
    <>
      {stocks.map((stock) => (
        <StockInfo key={stock.stockName} stock={stock} />
      ))}
    </>
  );
};

export default StockList;
