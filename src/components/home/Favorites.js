import React from "react";

import './Favorites.scss';

const Favorites = () => {
  const favorites = [
    {
      name: "DB",
      price: 30000,
      flucRate: 5.50
    },
    {
      name: "DB",
      price: 30000,
      flucRate: 5.50
    },
    {
      name: "DB",
      price: 30000,
      flucRate: 5.50
    },
    {
      name: "DB",
      price: 30000,
      flucRate: 5.50
    },
  ];

  return (
    <>
      <h4>내 관심종목</h4>
      <div id="favorites-title">
        <div>현재가</div>
        <div>등락률</div>
      </div>
      <div id="favorites-list">
        {favorites.map(stock => (
          <p key={stock.name}>
            <div>{stock.name}</div>
            <div>{stock.price}</div>
            <div>{stock.flucRate}</div>
          </p>
        ))}
      </div>
    </>
  )
}

export default Favorites;