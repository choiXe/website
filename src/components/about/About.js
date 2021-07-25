import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './About.scss';
import './Card.css';

import huey from '../../images/profile/huey.png';
import ricky from '../../images/profile/ricky.png';
import mike from '../../images/profile/mike.png';
import yejun from '../../images/profile/yejun.png';

const About = () => {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);

  const team = [
    {
      url: 'https://www.linkedin.com/in/hueyk/',
      name: 'Huey Kim',
      position: 'Founder, CEO',
      school: "Georgia Tech IE '24",
      experience: 'Project Team Intern @ Bain & Company',
      image: huey
    },
    {
      url: 'https://www.linkedin.com/in/ricky-kim-/',
      name: 'Ricky Kim',
      position: 'Front-end Developer',
      school: "Georgia Tech ChBE '24",
      experience: 'SWE Intern @ Walmart',
      image: ricky
    },
    {
      url: 'https://www.linkedin.com/in/sehoanchoi/',
      name: 'Mike Choi',
      position: 'Full Stack Developer',
      school: "UVA CS '23",
      experience: 'SWE Intern @ Fasoo',
      image: mike
    },
    {
      url: 'https://www.linkedin.com/in/ye-jun-kim-350033180/',
      name: 'Yejun Kim',
      position: 'UX/UI Designer',
      school: "Georgia Tech CM '21",
      experience: 'UI/UX Designer @ AKA',
      image: yejun
    }
  ];

  useEffect(() => {
    document.title = 'choiXe :: ' + t('About.navTitle');
  });

  return (
    <div id="about">
      <div className="about-menu">
        <button
          onClick={() => setShowIntro(true)}
          id={showIntro ? 'active' : ''}
        >
          {t('About.menu-1')}
        </button>
      </div>
      <div id="intro">
        <div id="title">
          <h1>🧭 {t('About.title')}</h1>
        </div>
        <div id="question">
          <span>
            {t('About.question.first')}
            <br></br>
            {t('About.question.second')}
            <br></br>
            {t('About.question.third')}
          </span>
        </div>
        <div className="body">
          <span>
            {t('About.body-1.first')}
            <b>{t('About.body-1.bold')}</b>
            {t('About.body-1.last')}
          </span>
        </div>
        <div className="body">
          <span>
            {t('About.body-2.first')}
            <br></br>
            {t('About.body-2.second')}
            <br></br>
            {t('About.body-2.third')} <b>choiXe</b>
            {t('About.body-2.fourth')}
          </span>
        </div>
        <div className="body">
          <span>
            {t('About.body-3.first')}
            <br></br>
            {t('About.body-3.second')}
            <br></br>
            {t('About.body-3.third')}
          </span>
        </div>
        <div className="body">
          <span>
            {t('About.body-4.the')}
            <b>choiXe</b>
            {t('About.body-4.first')}
            <br></br>
            {t('About.body-4.second')}
          </span>
        </div>
        <div className="body">
          <span>
            {t('About.secret.first')} 🤫<br></br>
            {t('About.secret.second')}
            <br></br>
            <b>{t('About.secret.third')}</b>
          </span>
        </div>
        <div id="team">
          <h1>🧙🏻‍♀️ {t('About.team')}</h1>
        </div>
        <div id="profile">
          <ul className="cards">
            {team.map((profile, index) => (
              <li key={index}>
                <a
                  href={profile.url}
                  className="card"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={profile.image} className="card__image" alt="" />
                  <div className="card__overlay">
                    <div className="card__header">
                      <div className="card__header-text">
                        <h3 className="card__title">{profile.name}</h3>
                        <span className="card__status">{profile.position}</span>
                      </div>
                    </div>
                    <p className="card__description">
                      - {profile.school}<br></br>
                      - {profile.experience}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
