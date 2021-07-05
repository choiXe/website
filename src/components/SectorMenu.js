import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./SectorMenu.scss";

const SectorMenu = ({ selected }) => {
  const [curSector, setCurSector] = useState(selected);
  const sectors = ["건강관리", "경기관련소비재", "금융", "산업재", "소재",
    "에너지", "유틸리티", "커뮤니케이션서비스", "필수소비재", "IT"];

  const listSectors = () => {
    return (
      sectors.map(sectorName => (
        <Link to={{ pathname: '/sector', state: sectorName}}
          className={curSector === sectorName 
            ? "sector-item active" : "sector-item"}
          key={sectorName}
          onClick={({ target }) => setCurSector(target.innerText)}
        >
          {sectorName}
        </Link>
      ))
    )
  }

  return (
    <>
      <h3>섹터</h3>
      <ul className="sector-list">
        {listSectors()}
      </ul>
    </>
  );
};


export default SectorMenu;
