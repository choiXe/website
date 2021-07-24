import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

import NavMenu from './NavMenu';

import './Navbar.scss';

import logo from '../../images/logo.png';

function Navbar() {
  const [lang, setLang] = useState();

  useEffect(() => {
    setLang(localStorage.getItem('i18nextLng'));
  }, []);

  const changeLngTo = (lang) => {
    i18next.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <nav>
      <div id="locale">
        <button
          className={lang === 'ko' ? 'active' : ''}
          onClick={() => changeLngTo('ko')}
        >
          KO
        </button>
        |
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => changeLngTo('en')}
        >
          EN
        </button>
      </div>
      <div id="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="choiXe logo" /> choiXe
        </Link>
      </div>
      <div id="nav-right">
        <NavMenu />
      </div>
    </nav>
  );
}

export default Navbar;
