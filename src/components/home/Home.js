import React, { useEffect, useState } from "react";
import Sticky from "react-stickynode";
import Loader from "react-loader-spinner";
import SectorMenu from "../sector/SectorMenu";
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
      <div className="loading">
        <Loader
          type="MutatingDots"
          color="#BBD2C5"
          secondaryColor="#536976"
          height={100}
          width={100}
        />
      </div>
    );
  } else {
    return (
      <div id="home">
        <Sticky top={20} innerClass="menu">
          <SectorMenu selected="" />
        </Sticky>
        <div id="info">섹터를 선택해 주세요!</div>
      </div>
    );
  };
};

export default Home;
