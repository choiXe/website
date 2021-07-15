import React from "react";
import { Link } from "react-router-dom";

import NavMenu from "./NavMenu";

import "./Navbar.scss";

import logo from "../../images/logo.png";

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="choiXe logo" />
          choiXe
        </Link>
      </div>
      <div className="nav-right">
        <NavMenu />
      </div>
    </nav>
  );
}

export default Navbar;
