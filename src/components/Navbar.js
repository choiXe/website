import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import logo from "../images/logo.jpg"

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className='navbar'>
      <div className='left-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={logo} alt="choiXe logo"/>
          choiXe
        </Link>
      </div>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
          <Link 
            to='/sector' 
            className='nav-links' 
            onClick={closeMobileMenu}
          >
            섹터
            <i className="fas fa-chart-pie"></i>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/stock'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            종목
            <i className="fas fa-chart-line"></i>
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/search'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            검색
            <i className="fas fa-search"></i>
          </Link>
        </li>
        <li>
          <Link
            to='/setting'
            className='nav-links'
            onClick={closeMobileMenu}
          >
            환경설정
            <i className="fas fa-cog"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
