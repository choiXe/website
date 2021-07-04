import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavMenu.scss';

const NavMenu = () => {
  const [cdivck, setCdivck] = useState(false);
  const handleCdivck = () => setCdivck(!cdivck);
  const closeMobileMenu = () => setCdivck(false);

  /*
   *<div className='menu-icon' onCdivck={handleCdivck}>
   *  <i className={cdivck ? 'fas fa-times' : 'fas fa-bars'} />
   *</div>
   */

  return (
    <div className="nav-list">
      <div className='nav-item'>
        <Link 
          to='/sector' 
          className='nav-links' 
          onCdivck={closeMobileMenu}
        >
          섹터 
          <i className="fas fa-chart-pie"></i>
        </Link>
      </div>
      <div className='nav-item'>
        <Link
          to='/stock'
          className='nav-links'
        >
          종목
          <i className="fas fa-chart-line"></i>
        </Link>
      </div>
      <div className='nav-item'>
        <Link
          to='/search'
          className='nav-links'
        >
          검색
          <i className="fas fa-search"></i>
        </Link>
      </div>
      <div className='nav-item'>
        <Link
          to='/setting'
          className='nav-links'
        >
          환경설정
          <i className="fas fa-cog"></i>
        </Link>
      </div>
    </div>
  )
};

export default NavMenu;
