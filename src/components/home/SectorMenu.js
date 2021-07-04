import React from 'react';

const SectorMenu = ({ curSector, setCurSector }) => {
  const sectors = ["건강관리", "경기관련소비재", "금융", "산업재", "소재",
    "에너지", "유틸리티", "커뮤니케이션\n 서비스", "필수소비재", "IT"];

  return (
    <ul className="sector-list">
      {sectors.map(sectorName => (
        <li className={curSector === sectorName ?  "sector-item" : "sector-item active"}
        >
          {sectorName}
        </li>
      ))}
    </ul>
  );
};

export default SectorMenu;
