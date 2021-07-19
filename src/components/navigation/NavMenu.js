import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useTranslation } from 'react-i18next';

import stockList from './stocksData';
import './NavMenu.scss';

const NavMenu = () => {
  let history = useHistory();
  const { t } = useTranslation();

  const searchBarStyle = {
    borderRadius: '11px',
    backgroundColor: 'white',
    lineColor: '#2A2F47',
    iconColor: '#2A2F47',
    fontFamily: 'Pretendard',
    zIndex: 2
  };

  const selectHandler = (item) => {
    history.push({
      pathname: '/stock',
      state: { stockId: item.name, stockName: item.id }
    });
  };

  return (
    <div className="nav-list">
      <div className="nav-item">
        <Link to="/about" className="nav-links">
          {t('About.navTitle')}
          <i className="fas fa-question-circle"></i>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/" className="nav-links">
          {t('Sector.navTitle')}
          <i className="fas fa-chart-pie"></i>
        </Link>
      </div>
      <div className="nav-item">
        <Link
          to={{
            pathname: '/stock',
            state: {
              stockId: '005930',
              stockName: '삼성전자'
            }
          }}
          className="nav-links"
        >
          {t('Stock.navTitle')}
          <i className="fas fa-chart-line"></i>
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/setting" className="nav-links">
          {t('Setting.navTitle')}
          <i className="fas fa-cog"></i>
        </Link>
      </div>
      <div className="search-bar">
        <ReactSearchAutocomplete
          items={stockList}
          fuseOptions={{ keys: ['id'] }}
          resultStringKeyName="id"
          inputDebounce={0}
          onSelect={selectHandler}
          placeholder={t('SearchBar.label')}
          styling={searchBarStyle} // To display it on top of the search box below
          autoFocus
        />
      </div>
    </div>
  );
};

export default NavMenu;
