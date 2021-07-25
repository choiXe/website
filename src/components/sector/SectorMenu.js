import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './SectorMenu.scss';

const SectorMenu = ({ selected, selectHandler }) => {
  const { t } = useTranslation();
  const [curSector, setCurSector] = useState(selected);

  const sectors = [
    { sector: '건강관리', icon: 'fas fa-syringe' },
    { sector: '경기관련소비재', icon: 'fas fa-store' },
    { sector: '금융', icon: 'fas fa-dollar-sign' },
    { sector: '산업재', icon: 'fas fa-industry' },
    { sector: '소재', icon: 'fas fa-vial' },
    { sector: '에너지', icon: 'fas fa-bolt' },
    { sector: '유틸리티', icon: 'fas fa-wrench' },
    { sector: '커뮤니케이션서비스', icon: 'fas fa-comments' },
    { sector: '필수소비재', icon: 'fas fa-shopping-cart' },
    { sector: 'IT', icon: 'fas fa-microchip' }
  ];

  return (
    <>
      <h3>{t('Sector.SectorMenu.title')}</h3>
      <ul className="sector-list">
        {sectors.map((item, index) => (
          <Link
            to={{ pathname: '/sector', state: item.sector }}
            className={
              curSector === item.sector ? 'sector-item active' : 'sector-item'
            }
            key={index}
            onClick={({ target }) => {
              setCurSector(target.innerText);
              if (selectHandler) {
                selectHandler(null);
              }
            }}
          >
            <div>{t('Sector.SectorMenu.' + item.sector)}</div>
            <i className={item.icon}></i>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default SectorMenu;
