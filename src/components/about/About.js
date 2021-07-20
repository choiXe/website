import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './About.scss';
import './Card.css';

import huey from '../../images/profile/huey.png';
import mike from '../../images/profile/mike.png';
import ricky from '../../images/profile/ricky.png';
import yejun from '../../images/profile/yejun.png';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'choiXe :: ' + t('About.navTitle');
  });

  return (
    <div id="about">
      <div id="menu"></div>
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
          <ul class="cards">
            <li>
              <a
                href="https://www.linkedin.com/in/hueyk/"
                class="card"
                rel="noreferrer"
                target="_blank"
              >
                <img src={huey} class="card__image" alt="" />
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Huey Kim</h3>
                      <span class="card__status">Founder, CEO</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech IE '24<br></br>- Project Team Intern @ Bain &
                    Company
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ricky-kim-/"
                class="card"
                rel="noreferrer"
                target="_blank"
              >
                <img src={ricky} class="card__image" alt="" />
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Ricky Kim</h3>
                      <span class="card__status">Front-end Developer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech ChBE '24<br></br>- SWE Intern @ Walmart
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sehoanchoi/"
                class="card"
                rel="noreferrer"
                target="_blank"
              >
                <img src={mike} class="card__image" alt="" />
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Mike Choi</h3>
                      <span class="card__status">Full Stack Developer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - UVA CS '23<br></br>- SWE Intern @ Fasoo
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ye-jun-kim-350033180/"
                class="card"
                rel="noreferrer"
                target="_blank"
              >
                <img src={yejun} class="card__image" alt="" />
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Yejun Kim</h3>
                      <span class="card__status">UI/UX Designer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech CM '21<br></br>- UI/UX Designer @ AKA
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
