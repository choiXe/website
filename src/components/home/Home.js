import React, { useEffect, useState } from "react";
import Sticky from "react-stickynode";

import SectorMenu from "../sector/SectorMenu";
import StockMarket from "./StockMarket";
import Favorites from "./Favorites";

import data from "../../services/data";

import "./Home.scss";

// Temporary function to test the graph selection

const Home = () => {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    document.title = "choiXe :: 투자가 처음이야?";
    data
      .getMainInfo('')
      .then((data) => setMainData(data.getMainInfo));
  }, []);

  if (!mainData) {
    return (
      <div id="info">데이터 불러오는 중...</div>
    )
  } else {
    return (
      <div id="home">
        <Sticky top={20} bottomBoundary="#trending-list" innerClass="menu">
          <SectorMenu selected="" />
        </Sticky>
        <div id="stock-market">
          <StockMarket data={mainData} />
        </div>
        <div id="favorites">
          <Favorites />
        </div>
        <div id="trending-list">
          trending
        </div>
      </div>
    )
  }

};

export default Home;
