import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import * as queries from './graphql/queries';

import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sector from './components/pages/Sector'
import Stock from './components/pages/Stock';
import Search from './components/pages/Search';
import Setting from './components/pages/Setting';

import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const sendQuery1 = async() => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getStockInfo, {
      stockId: '011070',
      startDate: '2021-06-01'
    }))
    console.log(response);
  } catch (e) {
    console.log(e.errors[0].message);
  }
}

const sendQuery2 = async() => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getStockInfo, {
      stockId: '035420',
      startDate: '2021-06-01'
    }))
    console.log(response);
  } catch (e) {
    console.log(e.errors[0].message);
  }
}

const sendQuery3 = async() => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getStockInfo, {
      stockId: '352820',
      startDate: '2021-06-01'
    }))
    console.log(response);
  } catch (e) {
    console.log(e.errors[0].message);
  }
}

const sendQuery4 = async() => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getSectorInfo, {
      sectorName: 'IT',
      startDate: '2021-06-01'
    }))
    console.log(response);
  } catch (e) {
    console.log(e.errors[0].message);
  }
}

const sendQuery5 = async() => {
  try {
    const response = await API.graphql(graphqlOperation(queries.getSectorInfo, {
      sectorName: '소재',
      startDate: '2021-06-01'
    }))
    console.log(response);
  } catch (e) {
    console.log(e.errors[0].message);
  }
}

function App() {
  return (
    <>
      <button onClick={sendQuery1}> LG이노텍 </button>
      <button onClick={sendQuery2}> NAVER </button>
      <button onClick={sendQuery3}> 하이브 </button>
      <button onClick={sendQuery4}> IT 섹터 </button>
      <button onClick={sendQuery5}> 소재 섹터 </button>
      <Router>
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
