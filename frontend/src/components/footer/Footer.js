import React from "react";
import { Link } from "react-router-dom";
import "./footer.styles.css";
import logo from "../../images/logo/cosmic-craze-white-text.png";
import emblem from "../../images/logo/Logo-White.png";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content-column-area">
        {/* company info */}
        <div className="footer-contentent-column">
          <img src={emblem} alt="logo" className="company-emblem" />
          <img src={logo} alt="logo" className="company-logo" />
          <p className="company-motto">
            Unveiling the mysteries, igniting curiosity, one star at a time.
          </p>
        </div>
        {/* fellow partnerships */}
        <div className="footer-contentent-column">
          <span className="footer-headline">Quick Links</span>

          <Link to="/" className="footer-sublink">
            Home
          </Link>
          <Link to="/" className="footer-sublink">
            About Us
          </Link>
          <Link to="/" className="footer-sublink">
            Services
          </Link>
          <Link to="/" className="footer-sublink">
            Support
          </Link>
        </div>
        {/* social media contact */}
        <div className="footer-contentent-column">
          <span className="footer-headline">Contact Us</span>

          <div className="social-media-links">
            <a href="#sample" className="social-media-link">
              <FaFacebookSquare />
            </a>
            <a href="#sample" className="social-media-link">
              <FaSquareXTwitter />
            </a>
            <a href="#sample" className="social-media-link">
              <FaInstagramSquare />
            </a>
            <a href="#sample" className="social-media-link">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-line">
        <span className="copyright-ribbon">
          ©Developed & Maintained by Dileep Lakshan Hewavitharana. All rights
          reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;
