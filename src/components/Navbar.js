import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from "../images/logo.jpg"

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt="choiXe logo"/>
            choiXe
            <i className='fab fa-typo3' />
          </Link>
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
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/stock'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                종목
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/search'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                검색
              </Link>
            </li>
            <li>
              <Link
                to='/setting'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                환경설정
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
