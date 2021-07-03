import React from 'react';

const SectorMenu = ({ curSector, setCurSector }) => {
  const sectors = ["건강관리", "경기관련소비재", "금융", "산업재", "소재",
    "에너지", "유틸리티", "커뮤니케이션\n 서비스", "필수소비재", "IT"];

  const Highlight = ({ active, sectorName, onClick }) => {
    return (
      <button onClick={onClick} className={active ? "active" : "inactive"}>
        {sectorName}
      </button>
    );
  };

  return (
    <div className="sector-style">
      {sectors.map(sectorName => (
        <Highlight
          key={sectorName}
          sectorName={sectorName}
          active={sectorName === curSector}
          onClick={() => setCurSector(sectorName)}
        />
      ))}
    </div>
  );
};

export default SectorMenu;
