import React, { useState } from 'react';

import './Favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites'))
  );

  const numbWithCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num;
    }
  };

  const removeFavorite = (event) => {
    const deletedStock = event.target.name;
    const updatedFavorites = favorites.filter(
      (stock) => stock.name !== deletedStock
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const calColor = (n) => {
    return n >= 0 ? '#e21414' : '#246ded';
  };

  return (
    <>
      <h4>내 관심종목</h4>
      <div id="favorites-title">
        <div>종목 이름</div>
        <div>현재가</div>
        <div>등락률</div>
      </div>
      <div id="favorites-list">
        {favorites && favorites.length !== 0
          ? favorites.map((stock, index) => (
              <li key={index}>
                <p>{stock.name}</p>
                <p style={{ color: calColor(stock.changeRate) }}>
                  {numbWithCommas(stock.tradePrice)}
                </p>
                <p style={{ color: calColor(stock.changeRate) }}>
                  {stock.changeRate >= 0
                    ? '+' + stock.changeRate
                    : stock.changeRate}
                  %
                  <button onClick={removeFavorite} name={stock.name}>
                    X
                  </button>
                </p>
              </li>
            ))
          : '관심 종목을 추가해보세요!'}
      </div>
    </>
  );
};

export default Favorites;
