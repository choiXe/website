import React from "react";

import SectorMenu from '../SectorMenu';

import './Home.scss'

// Temporary function to test the graph selection

const Home = () => {

  document.title = "choiXe :: 투자가 처음이야?";

  return (
    <div className="container">
      <div className="menu-container">
        <SectorMenu selected=""/>
      </div>

      <div className="info-container">
        섹터를 선택해 주세요!
      </div>

    </div>
  );
}

export default Home;
