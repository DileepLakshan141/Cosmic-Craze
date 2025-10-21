import React from "react";
import "./home-page.styles.css";
import HeroImageOne from "../../images/hero-option-three.jpg";
import QuoteImage from "../../images/quote-image.png";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ServiceCard from "../../components/service-card/ServiceCard";
import ServiceList from "../../data/services_data";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page-container">
      {/* hero section */}
      <section className="hero-container">
        {/* header including nav bar */}
        <Header />
        {/* content layer */}
        <div className="content-layer">
          <div className="welcome-info">
            <p className="tag-line">
              Explore the Universe with <span>Cosmic Craze</span>
            </p>
            <p className="site-description">
              Welcome to "Cosmic Craze", where the wonders of the cosmos come to
              life. Immerse yourself in a celestial playground filled with
              stunning imagery, fascinating facts, and real-time updates from
              the frontiers of space exploration. Fuel your passion for the
              unknown and let your curiosity soar among the stars.
            </p>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button className="get-start-btn">
                Get Start <FaArrowRightLong className="get-start-arrow" />
              </button>
            </Link>
          </div>
        </div>
        {/* hero section image layer */}
        <div
          className="banner-layer"
          style={{ backgroundImage: `url(${HeroImageOne})` }}
        ></div>
      </section>

      {/* quote section */}
      <section className="quote-section">
        <div className="quote-area">
          <div
            className="quote-mark"
            style={{ backgroundImage: `url(${QuoteImage})` }}
          ></div>
          <p className="quote-content">
            Exploration is wired into our brains. If we can see the horizon, we
            want to know what's beyond.
          </p>
          <span className="quote-author">Buzz Aldrin,</span>
        </div>
      </section>

      {/* who are we section */}
      <section
        className="company-section"
        style={{
          backgroundImage: `url(${GalaxyBlack})`,
        }}
      >
        <div className="opacity-filter"></div>
        <div className="company-section-content-area">
          <span className="main-title">Who are we</span>
          <div className="company-section-content-container">
            <div className="company-section-content-placeholder-image">
              <div className="placeholder-image-opacity"></div>
              <div className="image-holder"></div>
            </div>
            <div className="company-section-content">
              {/* paragraph one */}
              <p>
                At CosmicCraze, we are passionate pioneers in the realm of space
                exploration. Founded by a team of avid astronomers, scientists,
                and technology enthusiasts, our mission is to bring the wonders
                of the universe closer to everyone, right at their fingertips.
              </p>
              {/* paragraph two */}
              <p>
                Driven by our insatiable curiosity and love for the cosmos, we
                strive to make the mysteries of space accessible and engaging
                for people of all ages and backgrounds. Through our innovative
                platform, we aim to inspire a sense of wonder and ignite the
                spark of discovery in each and every one of our users.
              </p>
              {/* paragraph three */}
              <p>
                With CosmicCraze, you'll embark on a journey to the furthest
                reaches of the galaxy, exploring breathtaking imagery,
                fascinating facts, and the latest discoveries from NASA and
                beyond. Join us as we unlock the secrets of the universe and
                chart a course towards a brighter, more enlightened future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* our services section */}
      <section
        className="service-section"
        style={{
          backgroundImage: `url(${GalaxyBlack})`,
        }}
      >
        <div className="opacity-filter"></div>
        <div className="service-section-content-area">
          <span className="main-title">Whate We Offer</span>
          <div className="service-section-content-container">
            {ServiceList.map((service, index) => {
              return <ServiceCard service={service} key={index} />;
            })}
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
