import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./SectorMenu.scss";

const SectorLink = ({ name }) => {
  return (
    <Link to={{ pathname: '/sector', state: name}}
      className="menu-link"
    >
      {name}
    </Link>
  )
}

const SectorMenu = ({ selected }) => {
  const [curSector, setCurSector] = useState(selected);
  const sectors = ["건강관리", "경기관련소비재", "금융", "산업재", "소재",
    "에너지", "유틸리티", "커뮤니케이션 서비스", "필수소비재", "IT"];

  const listSectors = () => {
    return (
      sectors.map(sectorName => (
        <li 
          className={curSector === sectorName 
            ? "sector-item" : "sector-item active"}
          key={sectorName}
          onClick={({ target }) => setCurSector(target.innerText)}
        >
          <SectorLink name={sectorName} />
        </li>
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
