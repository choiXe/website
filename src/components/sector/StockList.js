import React from 'react';
import { Link } from 'react-router-dom';

import { calColor } from '../tools/formatter';

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
      <div>{stock.tradePrice}</div>
      <div style={calColor(parseInt(stock.changePrice), 0)}>
        {parseInt(stock.changePrice) >= 0
          ? '▲ ' + stock.changePrice
          : '▼ ' + stock.changePrice.replace('-', '')}
      </div>
      <div style={calColor(stock.changeRate, 0)}>
        {stock.changeRate > 0 ? '+' : ''}
        {stock.changeRate}%
      </div>
      <div>{stock.priceAvg}</div>
      <div style={calColor(stock.expYield, 0)}>
        {stock.expYield > 0 ? '+' : ''}
        {stock.expYield}%
      </div>
      <div
        style={stock.score >= 50 ? { color: '#e21414' } : { color: '#246ded' }}
      >
        {stock.score}
      </div>
      <div>
        <div style={calColor(stock.changeRate, 0)}>
          {stock.changeRate > 0 ? '+' : ''}
          {stock.changeRate}%
          <br/>
          {parseInt(stock.changePrice) >= 0
            ? '+ ' + stock.changePrice
            : '- ' + stock.changePrice.replace('-', '')}
        </div>
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
