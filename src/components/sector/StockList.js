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
      <div id="price">{stock.tradePrice}</div>
      <div id="price-change" style={calColor(parseInt(stock.changePrice), 0)}>
        {parseInt(stock.changePrice) >= 0
          ? '▲ ' + stock.changePrice
          : '▼ ' + stock.changePrice.replace('-', '')}
      </div>
      <div id="rate" style={calColor(stock.changeRate, 0)}>
        {stock.changeRate > 0 ? '+' : ''}
        {stock.changeRate}%
      </div>
      <div id="price-avg">{stock.priceAvg}</div>
      <div id="yield" style={calColor(stock.expYield, 0)}>
        {stock.expYield > 0 ? '+' : ''}
        {stock.expYield}%
      </div>
      <div id="score" style={calColor(stock.score, 50)}>{stock.score}</div>
      <div id="mobile">
        <div style={calColor(stock.changeRate, 0)}>
          <h4>
            {stock.changeRate > 0 ? '+' : ''}
            {stock.changeRate}%
          </h4>
          <h5>
            {parseInt(stock.changePrice) >= 0
              ? '+' + stock.changePrice
              : '-' + stock.changePrice.replace('-', '')}
          </h5>
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
