import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import data from '../../services/data';

import './StockList.scss';

const StockInfo = ({ stock }) => {
  const [stockDetail, setStockDetail] = useState(null);

  useEffect(() => {
    data.getStockInfo(stock.stockId, "2021-06-01")
      .then(detail => {
        if(!detail) {
          console.log("Following stock is not found in data", stock.stockId);
        } else {
          setStockDetail(detail.data.getStockInfo)
        }
      });
  },[stock.stockId])

  const numbWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Link to={{pathname: '/stock', state: stockDetail}} className="stock-item">
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
  return (
    <>
      {stocks.map(stock => (
        <StockInfo key={stock.stockName} stock={stock} />
      ))}
    </>
  )
}

export default StockList;
