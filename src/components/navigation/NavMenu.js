import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/core/Autocomplete';

import stockList from './stocksData';
import './NavMenu.scss';

const NavMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { t } = useTranslation();
  let history = useHistory();

  const textFieldStyle = {
    backgroundColor: 'white',
    boxShadow: '0.5px 0.5px 0.5px 0.5px #bfd1c6',
    borderRadius: 4
  };

  const filterOptions = createFilterOptions({
    limit: 10
  });

  const selectHandler = (item) => {
    history.push({
      pathname: '/stock',
      state: { stockId: item.name, stockName: item.id }
    });
  };

  return (
    <div className="nav-list">
      <div className={!openMenu ? "nav-items" : "nav-items mobile"}>
        {openMenu ? 
          <i className='far fa-window-close' onClick={()=>setOpenMenu(!openMenu)}></i>
          : <></>
        }
        <div className="nav-item">
          <Link to="/about" className="nav-links" 
            onClick={() => setOpenMenu(!openMenu)}
          >
            {t('About.navTitle')}
          </Link>
        </div>
        <div className="nav-item">
          <Link
            to={{ pathname: '/sector', state: '건강관리' }}
            className="nav-links" onClick={() => setOpenMenu(!openMenu)}
          >
            {t('Sector.navTitle')}
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
            onClick={() => setOpenMenu(!openMenu)}
          >
            {t('Stock.navTitle')}
          </Link>
        </div>
      </div>
      <div className="search-bar">
        <Autocomplete
          disablePortal
          options={stockList}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('SearchBar.label')}
              size="small"
              style={textFieldStyle}
            />
          )}
          getOptionLabel={(option) => option.id}
          onChange={(event, item) => {
            if (item !== null) selectHandler(item);
          }}
          filterOptions={filterOptions}
        />
      </div>
      <div id="hamburger">
        <i className='fas fa-bars' onClick={()=>setOpenMenu(!openMenu)}></i>
      </div>
    </div>
  );
};

export default NavMenu;
