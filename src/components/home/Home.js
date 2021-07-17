import React, { useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import SectorMenu from '../sector/SectorMenu';
import data from '../../services/data';

import './Home.scss';

// Temporary function to test the graph selection

const Home = () => {
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    document.title = 'choiXe :: 투자가 처음이야?';
    data.getMainInfo('').then((data) => setMainData(data.getMainInfo));
  }, []);

  const renderContent = (mainData) => {
    if (!mainData) {
      return <div id="info">데이터 불러오는 중...</div>;
    } else {
      return <div id="info">섹터를 선택해 주세요!</div>;
    }
  };

  return (
    <div id="home">
      <Sticky top={20} innerClass="menu">
        <SectorMenu selected="" />
      </Sticky>
      {renderContent(mainData)}
    </div>
  );
};

export default Home;
