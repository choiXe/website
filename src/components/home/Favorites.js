import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { numSeperator } from '../tools/formatter';

import './Favorites.scss';

const Favorites = () => {
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites'))
  );

  const removeFavorite = (event) => {
    const deletedStock = event.target.name;
    const updatedFavorites = favorites.filter(
      (stock) => stock.name !== deletedStock
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const calColor = (n) => {
    return n >= 0 ? { color: '#e21414' } : { color: '#246ded' };
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
                <p style={calColor(stock.changeRate)}>
                  {numSeperator(stock.tradePrice)}
                </p>
                <p style={calColor(stock.changeRate)}>
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
