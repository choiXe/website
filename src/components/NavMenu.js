import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import stockList from './stocksData';
import './NavMenu.scss';

const NavMenu = () => {
  let history = useHistory();

  const searchBarStyle = {
    borderRadius: "11px",
    backgroundColor: "white", 
    lineColor: "#2A2F47",
    iconColor: "#2A2F47",
    fontFamily: "Pretendard",
    zIndex: 2
  }

  const selectHandler = (item) => {
    history.push({
      pathname: '/stock',
      state: item.name
    })
  }

  return (
    <div className="nav-list">
      <div className='search-bar'>
        <ReactSearchAutocomplete
          items={stockList}
          fuseOptions={{ keys: ["id"] }}
          resultStringKeyName="id"
          inputDebounce={0}
          onSelect={selectHandler}
          placeholder="Search any stock here"
          styling={searchBarStyle} // To display it on top of the search box below
          autoFocus
          />
      </div>
      <div className='nav-item'>
        <Link 
          to='/' 
          className='nav-links' 
        >
          섹터 
          <i className="fas fa-chart-pie"></i>
        </Link>
      </div>
      <div className='nav-item'>
        <Link
          to='/stock'
          className='nav-links'
        >
          종목
          <i className="fas fa-chart-line"></i>
        </Link>
      </div>
      <div className='nav-item'>
        <Link
          to='/setting'
          className='nav-links'
        >
          환경설정
          <i className="fas fa-cog"></i>
        </Link>
      </div>
    </div>
  )
};

export default NavMenu;
