import React from "react";
import "./screen_loader.styles.css";
import LogoEmblem from "../../images/logo/Logo-Black.png";
import LogoText from "../../images/logo/cosmic-craze-black-text.png";

function ScreenLoader() {
  return (
    <div className="screen-loader-container">
      <img src={LogoEmblem} alt="logo-emblem" className="loader-emblem" />
      <img src={LogoText} alt="logo-text" className="loader-text" />
      <span className="loading-text">Loading...</span>
    </div>
  );
}

export default ScreenLoader;
