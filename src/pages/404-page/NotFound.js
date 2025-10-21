import React from "react";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import logo from "../../images/logo/nav-logo-white.png";
import "./not-found.styles.css";

function NotFound() {
  return (
    <div
      className="not-found-page-container"
      style={{ backgroundImage: `url(${GalaxyBlack})` }}
    >
      <div className="not-found-page-opacity-layer"></div>
      <div className="not-found-page-content-layer">
        <img src={logo} alt="company-logo" className="not-found-page-logo" />
        <span className="not-found-page-prompt">
          Looks like we got a problem
        </span>
        <span className="not-found-page-digit">404</span>
        <span className="not-found-page-prompt">
          Page you are looking for is not existing anymore!
        </span>
      </div>
    </div>
  );
}

export default NotFound;
