import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

import NavMenu from './NavMenu';

import './Navbar.scss';

import logo from '../../images/logo.png';

function Navbar() {
  const [lang, setLang] = useState();

  const changeLang = (lang) => {
    i18next.changeLanguage(lang);
    localStorage.setItem('savedLngSetting', lang);
    setLang(lang);
  };

  useEffect(() => {
    const savedLng = localStorage.getItem('savedLngSetting');
    if (savedLng) {
      changeLang(savedLng);
    }
  }, []);

  return (
    <nav>
      <div id="locale">
        <button
          className={lang === 'ko' ? 'active' : ''}
          onClick={() => changeLang('ko')}
        >
          KO
        </button>
        |
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => changeLang('en')}
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
        <NavMenu lang={lang} changeLang={changeLang} />
      </div>
    </nav>
  );
}

export default Navbar;
