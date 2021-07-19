import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  const removeFavorite = (event) => {
    const deletedStock = event.target.name;
    const updatedFavorites = favorites.filter(
      (stock) => stock.name !== deletedStock
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const calColor = (n) => {
    return n >= 0 ? '#e21414' : '#246ded';
  };

  return (
    <>
      <h4>{t('Home.Favorites.title')}</h4>
      <div id="favorites-title">
        <div>{t('Home.Favorites.stock')}</div>
        <div>{t('Home.Favorites.price')}</div>
        <div>{t('Home.Favorites.change')}</div>
      </div>
      <div id="favorites-list">
        {favorites && favorites.length !== 0 ? (
          favorites.map((stock, index) => (
            <li key={index}>
              <Link
                to={{
                  pathname: '/stock',
                  state: { stockId: stock.stockId, stockName: stock.name }
                }}
                className="link"
              >
                <p>{stock.name}</p>
                <p style={{ color: calColor(stock.changeRate) }}>
                  {numbWithCommas(stock.tradePrice)}
                </p>
                <p style={{ color: calColor(stock.changeRate) }}>
                  {stock.changeRate >= 0
                    ? '+' + stock.changeRate
                    : stock.changeRate}
                  %
                </p>
              </Link>
              <button onClick={removeFavorite} name={stock.name}>
                X
              </button>
            </li>
          ))
        ) : (
          <li>
            <p>{t('Home.Favorites.message')}</p>
            <p></p>
            <p></p>
          </li>
        )}
      </div>
    </>
  );
};

export default Favorites;
