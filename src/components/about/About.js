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
          <h1>🧭 choiXe를 소개합니다</h1>
        </div>
        <div id="question">
          <span>
            주식 투자를 처음으로 시작할 때 주변의 좋다는 소문만 듣고 샀던 경험이
            있으신가요?<br></br>
            혹시 회사에 대해 잘 알지 못하는데 막연한 기대감으로 투자를 하고
            있지는 않으신가요?<br></br>
            만약 그렇다면 현재는 그 회사에 대해 얼마나 아시나요?
          </span>
        </div>
        <div className="body">
          <span>
            안녕하세요, 저희는{' '}
            <b>초보 주식 투자자를 대상으로 투자 정보를 제공하는 플랫폼</b>을
            만드는 스타트업입니다.
          </span>
        </div>
        <div className="body">
          <span>
            저희는 위와 같은 문제를 방지하고 주식 투자자들에게 도움을 주기 위해
            <br></br>
            주식 투자에 필요한 객관적 투자 정보를 효과적으로 전달할 수 있는
            방법이 무엇일지 고민하게 되었고,<br></br>
            2021년 8월에 <b>choiXe</b> 라는 플랫폼을 처음으로 출시하였습니다.
          </span>
        </div>
        <div className="body">
          <span>
            저희는 기술적 지표를 기반으로 한 주가 예측이 아닌<br></br>
            애널리스트 리포트 데이터를 베이스로 다른 데이터를 함께 고려하여
            <br></br>
            회사에 대한 기본 및 세부 정보를 제공하고, 상승 여력과 투자 매력도를
            도출합니다.
          </span>
        </div>
        <div className="body">
          <span>
            <b>choiXe</b> 팀은 투자 정보를 제공하는 플랫폼을 개선 및 발전시키기
            위해 꾸준히 노력하며<br></br>
            정확한 데이터 제공과 UI/UX 개선을 중심으로 목표를 설정하고 있습니다.
          </span>
        </div>
        <div id="team">
          <h1>🧙🏻‍♀️ choiXe 팀원들</h1>
        </div>
        <div id="profile">
          <ul class="cards">
            <li>
              <a href="https://www.linkedin.com/in/hueyk/" class="card" rel="noreferrer" target="_blank">
                <img src={huey} class="card__image" alt=""/>
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Huey Kim</h3>
                      <span class="card__status">Founder, CEO</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech IE '24<br></br>
                    - Project Team Intern @ Bain & Company
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ricky-kim-/" class="card" rel="noreferrer" target="_blank">
                <img src={ricky} class="card__image" alt=""/>
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Ricky Kim</h3>
                      <span class="card__status">Front-end Developer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech ChBE '24<br></br>
                    - SWE Intern @ Walmart
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sehoanchoi/" class="card" rel="noreferrer" target="_blank">
                <img src={mike} class="card__image" alt=""/>
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Mike Choi</h3>
                      <span class="card__status">Full Stack Developer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - UVA CS '23<br></br>
                    - SWE Intern @ Fasoo
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ye-jun-kim-350033180/" class="card" rel="noreferrer" target="_blank">
                <img src={yejun} class="card__image" alt=""/>
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">Yejun Kim</h3>
                      <span class="card__status">UI/UX Designer</span>
                    </div>
                  </div>
                  <p class="card__description">
                    - Georgia Tech CM '21<br></br>
                    - UI/UX Designer @ AKA
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
