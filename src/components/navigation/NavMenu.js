import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/core/Autocomplete';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import stockList from './stocksData';
import './NavMenu.scss';

import logo from '../../images/logo.png';

const NavMenu = ({ lang, changeLang }) => {
  const [openDrawer, setOpenDrawer] = useState({top: false});

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


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{padding:"0 1rem"}}
    >
      <List>
        <ListItem id="topbar-logo" >
          <img src={logo} alt="choiXe logo" /> choiXe
        </ListItem>
        <Link to="/about" className="nav-links">
          <ListItem className="nav-item">
            {t('About.navTitle')}
          </ListItem>
        </Link>
        <Divider />
        <Link
          to={{ pathname: '/sector', state: '건강관리' }}
          className="nav-links"
        >
          <ListItem className="nav-item">
            {t('Sector.navTitle')}
          </ListItem>
        </Link>
        <Divider />
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
          <ListItem className="nav-item">
            {t('Stock.navTitle')}
          </ListItem>
        </Link>
        <Divider />
        <ListItem className="locale">
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
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="nav-list">
      <div className= "nav-items">
        <div className="nav-item">
          <Link to="/about" className="nav-links">
            {t('About.navTitle')}
          </Link>
        </div>
        <div className="nav-item">
          <Link
            to={{ pathname: '/sector', state: '건강관리' }}
            className="nav-links"
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
        <i className='fas fa-bars'
          onClick={toggleDrawer("top", true)}
        ></i>
        <Drawer
          anchor="top"
          open={openDrawer['top']}
          onClose={toggleDrawer("top", false)}
          className="drawer"
        >
          {list('top')}
        </Drawer>
      </div>
    </div>
  );
};

export default NavMenu;
