import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

import { numSeperator } from '../tools/formatter';
import data from '../../services/data';

import './Favorites.scss';

const Favorites = () => {
  const { t } = useTranslation();
  const [favoriteData, setFavoriteData] = useState(null);

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

  useEffect(() => {
    if (favorites != null) {
      let stockIds = '';
      for (let item of favorites) {
        stockIds += item.stockId + ',';
      }
      data
        .getFavoriteInfo(stockIds)
        .then((data) => setFavoriteData(data.getFavoriteInfo));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderContent = (favoriteData) => {
    if (!favoriteData) {
      return (
        <div id="favorites-list">
          <li>
            <p>{t('Home.Favorites.message')}</p>
            <p></p>
            <p></p>
          </li>
        </div>
      );
    } else {
      let favPriceRate = {};
      for (let i = 0; i < favoriteData.data.length; i++) {
        favPriceRate[favoriteData.data[i].stockId] = favoriteData.data[i];
      }

      return (
        <div id="favorites-list">
          {favorites.map((stock, index) => (
            <li key={index}>
              <Link
                to={{
                  pathname: '/stock',
                  state: { stockId: stock.stockId, stockName: stock.name }
                }}
                className="link"
              >
                <p>{stock.name}</p>
                <p style={calColor(favPriceRate[stock.stockId].rate)}>
                  {numSeperator(favPriceRate[stock.stockId].price)}
                </p>
                <p style={calColor(favPriceRate[stock.stockId].rate)}>
                  {favPriceRate[stock.stockId].rate >= 0
                    ? '+' + favPriceRate[stock.stockId].rate
                    : favPriceRate[stock.stockId].rate}
                  %
                </p>
              </Link>
              <button onClick={removeFavorite} name={stock.name}>
                X
              </button>
            </li>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <h4>{t('Home.Favorites.title')}</h4>
      <div id="favorites-title">
        <div>{t('Home.Favorites.stock')}</div>
        <div>{t('Home.Favorites.price')}</div>
        <div>{t('Home.Favorites.change')}</div>
      </div>
      {renderContent(favoriteData)}
    </>
  );
};

export default Favorites;
