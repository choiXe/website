import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { calColor } from '../tools/formatter';
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
  }, [favorites]);

  const listFavorites = (favoriteData) => {
    if (!favoriteData || favoriteData.data.length === 0) {
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
      let favData = {};
      for (let i = 0; i < favoriteData.data.length; i++) {
        favData[favoriteData.data[i].stockId] = favoriteData.data[i];
      }

      return (
        <>
          {favorites.map((stock, index) => (
            <li className="favorite-item"key={index}>
              <Link
                to={{
                  pathname: '/stock',
                  state: { stockId: stock.stockId, stockName: stock.name }
                }}
                className="favorite-item-detail"
              >
                <p>{stock.name}</p>
                <p style={calColor(favData[stock.stockId].rate, 0)}>
                  {favData[stock.stockId].price}
                </p>
                <p style={calColor(favData[stock.stockId].rate, 0)}>
                  {favData[stock.stockId].rate >= 0 ? '+' : ''}
                  {favData[stock.stockId].rate}%
                </p>
              </Link>
              <button onClick={removeFavorite} name={stock.name}>
                X
              </button>
            </li>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <h4 className="section-titles">{t('Home.Favorites.title')}</h4>
      <div id="favorites-column-titles">
        <div>{t('Home.Favorites.stock')}</div>
        <div>{t('Home.Favorites.price')}</div>
        <div>{t('Home.Favorites.change')}</div>
      </div>
      <div id="favorites-list">
        {listFavorites(favoriteData)}
      </div>
    </>
  );
};

export default Favorites;
