import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import SectorMenu from './SectorMenu';
import StockData from '../StockData';
import chartOption from "../unassigned/chartOption";

//import './Home.scss'

// Temporary function to test the graph selection

const Home = () => {
  // currently selected Sector
  const [curSector, setCurSector] = useState("");

  return (
    <div className="container">

      <div className="left-container">
        <h3 className="left-title">섹터</h3>
        <SectorMenu curSector={curSector} setCurSector={setCurSector}/>
      </div>

      <div className="right-container">
        <div className='sector-container' style={{flexDirection:'row'}}>
          <div id="stockContainer">
            {curSector != null ? showGraph(curSector, splitGroup(StockData())) : ''}
          </div>
          <p>{curSector}</p>
        </div>
        <div className='sector-container' style={{marginTop: '3%'}}>
          <p>Stock List</p>
        </div>
      </div>

    </div>
  );
}

export default Home;
