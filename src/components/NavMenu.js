import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import './NavMenu.scss';

const NavMenu = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ];

  let history = useHistory();

  const searchBarStyle = {
    borderRadius: "11px",
    backgroundColor: "white", 
    lineColor: "#2A2F47",
    iconColor: "#2A2F47",
    fontFamily: "Pretendard"
  }

  const searchHandler = () => {
    console.log("searching ");
  }

  const selectHandler = (stockId) => {
    setSearchKeyword("");
    history.push({
      pathname: '/stock',
      state: '035720' //stockId
    })
  }

  return (
    <div className="nav-list">
      <div className='search-bar'>
        <ReactSearchAutocomplete
          items={items}
          inputDebounce={0}
          onSearch={searchHandler}
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
