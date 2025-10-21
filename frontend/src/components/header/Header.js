import React from "react";
import "./header.styles.css";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/logo/nav-logo-white.png";

function Header() {
  return (
    <div className="header-container">
      {/* nav-bar-logo */}
      <div
        className="logo-section"
        style={{ backgroundImage: `url(${HeaderLogo})` }}
      ></div>

      {/* nav-link section */}
      <div className="nav-link-section">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/">
          Services
        </Link>
        <Link className="nav-link" to="/dashboard/apod">
          Explore
        </Link>
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Header;
