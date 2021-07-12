import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';

import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Sector from './components/sector/Sector'
import Stock from './components/stock/Stock';
import About from './components/about/About';
import Setting from './components/setting/Setting';

import './styles/global.scss';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {

  return (
    <>
      <Router>
        <div className="main-container">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="content">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/sector' component={Sector} />
              <Route path='/stock' component={Stock} />
              <Route path='/about' component={About} />
              <Route path='/setting' component={Setting} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
