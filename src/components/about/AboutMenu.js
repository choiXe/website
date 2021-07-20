import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './AboutMenu.scss';

const AboutMenu = ({ selected, selectHandler }) => {
  const { t } = useTranslation();
  const [curAbout, setCurAbout] = useState(selected);

  const about = ['choiXe 소개', 'choiXe 사용법'];
  const aboutIcons = ['fa-bolt', 'fa-question-circle'];

  const listAbout = () => {
    return about.map((aboutName, i) => (
      <Link
        to={{ pathname: '/about', state: aboutName }}
        className={
          curAbout === aboutName ? 'sector-item active' : 'sector-item'
        }
        key={aboutName}
        onClick={({ target }) => {
          setCurAbout(target.innerText);
          if (selectHandler) {
            selectHandler(null);
          }
        }}
      >
        <div>{aboutName}</div>
        <i className={'fas ' + aboutIcons[i]}></i>
      </Link>
    ));
  };

  return (
    <>
      <h3>{t('About.title')}</h3>
      <ul className="about-list">{listAbout()}</ul>
    </>
  );
};

export default AboutMenu;
