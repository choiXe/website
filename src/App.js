import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Amplify from "aws-amplify";

import Navbar from "./components/navigation/Navbar";
import Home from "./components/home/Home";
import Sector from "./components/sector/Sector";
import Stock from "./components/stock/Stock";
import About from "./components/about/About";
import Setting from "./components/setting/Setting";
import Footer from "./components/Footer";

import "./styles/global.scss";

import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <Router>
        <div id="container">
          <div id="navbar">
            <Navbar />
          </div>
          <div id="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/sector" component={Sector} />
              <Route path="/stock" component={Stock} />
              <Route path="/setting" component={Setting} />
            </Switch>
          </div>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
