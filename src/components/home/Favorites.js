import React, {useState} from "react";

import './Favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  const removeFavorite = event => {
    const deletedStock = event.target.name;
    const updatedFavorites = favorites.filter(stock => 
      stock.name !== deletedStock);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <h4>내 관심종목</h4>
      <div id="favorites-title">
        <div></div>
        <div>현재가</div>
        <div>등락률</div>
      </div>
      <div id="favorites-list">
        {favorites && favorites.length !== 0
          ? favorites.map((stock, index)=> (
            <li key={index}>
              <p>{stock.name}</p>
              <p>{stock.tradePrice}</p>
              <p>
                {stock.changeRate}
                <button onClick={removeFavorite} name={stock.name}>delete</button>
              </p>
            </li>
          )) 
          : "Add your favorite stocks and view here!"
        }
      </div>
    </>
  )
}

export default Favorites;
