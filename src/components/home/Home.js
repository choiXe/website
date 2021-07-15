import React from "react";
import Sticky from "react-stickynode";

import SectorMenu from "../sector/SectorMenu";

import "./Home.scss";

// Temporary function to test the graph selection

const Home = () => {
  document.title = "choiXe :: 투자가 처음이야?";

  return (
    <div id="home">
      <Sticky top={20} innerClass="menu">
        <SectorMenu selected="" />
      </Sticky>
      <div id="info">섹터를 선택해 주세요!</div>
    </div>
  );
};

export default Home;
