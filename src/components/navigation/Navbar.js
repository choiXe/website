import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

import NavMenu from './NavMenu';

import './Navbar.scss';

import logo from '../../images/logo.png';

function Navbar() {
  const [lang, setLang] = useState("");
  const handleClick = (lang) => {
    i18next.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <nav>
      <div id="locale">
        <button 
          className={lang === "ko" ? "active" : ""} 
          onClick={() => handleClick('ko')}>
          KO
        </button>|
        <button className={lang === "en" ? "active" : ""} 
          onClick={() => handleClick('en')}>
          EN
        </button>
      </div>
      <div id="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="choiXe logo" />
          choiXe
        </Link>
      </div>
      <div id="nav-right">
        <NavMenu />
      </div>
    </nav>
  );
}

export default Navbar;
