import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './SectorMenu.scss';

const SectorMenu = ({ selected, selectHandler }) => {
  const [curSector, setCurSector] = useState(selected);

  const { t } = useTranslation();
  const sectors = [
    '건강관리',
    '경기관련소비재',
    '금융',
    '산업재',
    '소재',
    '에너지',
    '유틸리티',
    '커뮤니케이션서비스',
    '필수소비재',
    'IT'
    /*
    t('Sector.SectorMenu.health'),
    t('Sector.SectorMenu.consumer'),
    t('Sector.SectorMenu.financial'),
    t('Sector.SectorMenu.industrial'),
    t('Sector.SectorMenu.material'),
    t('Sector.SectorMenu.energy'),
    t('Sector.SectorMenu.utility'),
    t('Sector.SectorMenu.telecomm'),
    t('Sector.SectorMenu.food'),
    t('Sector.SectorMenu.tech')
    */
  ];
  const sectorIcons = [
    'fa-syringe',
    'fa-store',
    'fa-dollar-sign',
    'fa-industry',
    'fa-vial',
    'fa-bolt',
    'fa-wrench',
    'fa-comments',
    'fa-shopping-cart',
    'fa-microchip'
  ];

  const listSectors = () => {
    return sectors.map((sectorName, i) => (
      <Link
        to={{ pathname: '/sector', state: sectorName }}
        className={
          curSector === sectorName ? 'sector-item active' : 'sector-item'
        }
        key={sectorName}
        onClick={({ target }) => {
          setCurSector(target.innerText);
          if (selectHandler) {
            selectHandler(null);
          }
        }}
      >
        <div>{sectorName}</div>
        <i className={'fas ' + sectorIcons[i]}></i>
      </Link>
    ));
  };

  return (
    <>
      <h3>{t('Sector.SectorMenu.title')}</h3>
      <ul className="sector-list">{listSectors()}</ul>
    </>
  );
};

export default SectorMenu;
