import React from "react";
import { Link } from "react-router-dom";

import NavMenu from "./NavMenu";

import "./Navbar.scss";

import logo from "../images/logo.png";

function Navbar() {
  return (
    <nav>
      <div className="left-container">
        <Link to="/" className="logo">
          <img src={logo} alt="choiXe logo" />
          choiXe
        </Link>
      </div>
      <div className="right-container">
        <NavMenu />
      </div>
    </nav>
  );
}

export default Navbar;
