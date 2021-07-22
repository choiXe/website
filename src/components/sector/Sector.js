import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Sticky from 'react-stickynode';
import InfiniteScroll from 'react-infinite-scroll-component';

import SectorMenu from './SectorMenu';
import StockList from './StockList';
import SectorChart from './SectorChart';
import { useTranslation } from 'react-i18next';
import data from '../../services/data';

import './Sector.scss';

const Sector = ({ location }) => {
  const { t } = useTranslation();
  const [cache, setCache] = useState({});
  const [sectorData, setSectorData] = useState(null);
  const [daysPassed, setDaysPassed] = useState(30);
  const [orderType, setOrderType] = useState('yield');
  const [sSectorSelected, setsSectorSelected] = useState(null);
  const dateButtons = [5, 15, 30, 60, 90];
  const curSector = location.state;

  const getPastDate = (n) => {
    let date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().slice(0, 10);
  };

  useEffect(() => {
    document.title = t('Sector.SectorMenu.' + curSector) + ' :: choiXe';
    const startDate = getPastDate(daysPassed);

    const key = curSector + '_' + startDate;
    const cachedData = cache[key];

    if (cachedData) {
      setSectorData(cachedData);
    } else {
      data.getSectorInfo(curSector, startDate).then((data) => {
        setSectorData(data.getSectorInfo);
        const updatedCache = {
          ...cache,
          [key]: data.getSectorInfo
        };
        setCache(updatedCache);
      });
    }
  }, [curSector, daysPassed, cache]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderContent = (sectorData) => {
    if (!sectorData) {
      return (
        <div id="info">
          <div id="loading">
            <Loader
              type="MutatingDots"
              color="#BBD2C5"
              secondaryColor="#536976"
              height={100}
              width={100}
            />
          </div>
        </div>
      );
    } else {
      const stocks = sectorData.stockList.filter((stock) => {
        if (!sSectorSelected) {
          return true;
        }
        return stock.sSector === sSectorSelected;
      });
      return (
        <div id="info">
          <div id="chart-section">
            <div>
              <div id="chart-top">
                <h4>{t('Sector.SectorMenu.' + curSector)}</h4>
                <div class="tooltip">
                  {t('Sector.tooltip.mainTitle')}
                  <div class="right">
                    <div class="text-content">
                      <h3>{t('Sector.tooltip.title1')}</h3>
                      <span>{t('Sector.tooltip.description1')}</span>
                      <h3>{t('Sector.tooltip.title2')}</h3>
                      <span>{t('Sector.tooltip.description2')}</span>
                      <h3>{t('Sector.tooltip.title3')}</h3>
                      <span>{t('Sector.tooltip.description3')}</span>
                      <div id="bottom-margin"></div>
                    </div>
                    <i></i>
                  </div>
                </div>
              </div>
              <div className="chart">
                <SectorChart
                  stocks={sectorData}
                  selectHandler={setsSectorSelected}
                />
              </div>
            </div>
            <div>
              <div className="date-select">
                {dateButtons.map((days) => (
                  <button
                    key={days}
                    value={days}
                    className={days === daysPassed ? 'active' : ''}
                    onClick={({ target }) =>
                      setDaysPassed(Number(target.value))
                    }
                  >
                    {days < 30
                      ? days + t('Sector.Caption.day')
                      : days / 30 + t('Sector.Caption.month')}
                  </button>
                ))}
              </div>
              <div className="yield">
                <h4>{t('Sector.Caption.avgYield')}</h4>
                <h1>
                  {sectorData.avgYield >= 0 ? ' +' : ' -'}
                  {sectorData.avgYield}%
                </h1>
              </div>
              <div className="top3-list">
                <h4>{t('Sector.Caption.top3')}</h4>
                <div className="list">
                  <div className="item">
                    <div className="number">1. </div>
                    <div className="box-item" id="item-1">
                      <div>
                        {t('Sector.Highchart.' + sectorData.top3List.first)}
                      </div>
                      <div>{sectorData.top3List.firstYield}%</div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">2. </div>
                    <div className="box-item" id="item-2">
                      <div>
                        {t('Sector.Highchart.' + sectorData.top3List.second)}
                      </div>
                      <div>{sectorData.top3List.secondYield}%</div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="number">3. </div>
                    <div className="box-item" id="item-3">
                      <div>
                        {t('Sector.Highchart.' + sectorData.top3List.third)}
                      </div>
                      <div>{sectorData.top3List.thirdYield}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="list-title">
            <div>{t('Sector.StockList.stock')}</div>
            <div>{t('Sector.StockList.price')}</div>
            <div>{t('Sector.StockList.change')}</div>
            <div>{t('Sector.StockList.rate')}</div>
            <div>{t('Sector.StockList.consensus')}</div>
            <div>
              <button onClick={() => setOrderType('yield')}>
                {t('Sector.StockList.upside')}{' '}
                <i
                  className={
                    orderType === 'yield' ? 'fas fa-sort-down' : 'fas fa-sort'
                  }
                ></i>
              </button>
            </div>
            <div>
              <button onClick={() => setOrderType('score')}>
                {t('Sector.StockList.score')}{' '}
                <i
                  className={
                    orderType === 'score' ? 'fas fa-sort-down' : 'fas fa-sort'
                  }
                ></i>
              </button>
            </div>
          </div>
          <div id="stock-list">
            <InfiniteScroll dataLength={40} height="40rem">
              <StockList stocks={stocks} order={orderType} />
            </InfiniteScroll>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="sector">
      <Sticky top={20} bottomBoundary="#stock-list" innerClass="menu">
        <SectorMenu selected={curSector} selectHandler={setsSectorSelected} />
      </Sticky>
      {renderContent(sectorData)}
    </div>
  );
};

export default Sector;
