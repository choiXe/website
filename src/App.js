import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Amplify from 'aws-amplify';

import data from "./services/data";
import awsconfig from './aws-exports';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Sector from './components/pages/Sector'
import Stock from './components/pages/Stock';
import Search from './components/pages/Search';
import Setting from './components/pages/Setting';

Amplify.configure(awsconfig);

function App() {
  const [stock, setStock] = useState();

  const sendQuery1 = async() => {
    const res = await data.getStockInfo('011070', '2021-06-01');
    console.log(res);
    setStock(res);
  }
  
  const sendQuery2 = async() => {
    const res = await data.getStockInfo('035420', '2021-06-01');
    console.log(res);
    setStock(res);
  }
  
  const sendQuery3 = async() => {
    const res = await data.getStockInfo('352820', '2021-06-01');
    console.log(res);
    setStock(res);
  }
  
  const sendQuery4 = async() => {
    const res = await data.getSectorInfo('IT', '2021-06-01');
    console.log(res);
  }
  
  const sendQuery5 = async() => {
    const res = await data.getSectorInfo('소재', '2021-06-01');
    console.log(res);
  }

  return (
    <>
      <button onClick={sendQuery1}> LG이노텍 </button>
      <button onClick={sendQuery2}> NAVER </button>
      <button onClick={sendQuery3}> 하이브 </button>
      <button onClick={sendQuery4}> IT 섹터 </button>
      <button onClick={sendQuery5}> 소재 섹터 </button>
      <Router>
        <Link to={{pathname: '/stock', state: stock}}><button>View Stock</button></Link>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sector' component={Sector} />
          <Route path='/stock' component={Stock} />
          <Route path='/search' component={Search} />
          <Route path='/setting' component={Setting} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
