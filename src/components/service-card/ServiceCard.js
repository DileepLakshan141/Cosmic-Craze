import React from "react";
import "./service-card.styles.css";

function ServiceCard({ service }) {
  const { image, serviceName, shortName, serviceDescription } = service;
  return (
    <div className="service-card-container">
      <div className="service-card-image-container">
        <div className="service-card-filter"></div>
        <div
          className="service-card-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <span className="service-short-name">{shortName}</span>
      <span className="service-name">{serviceName}</span>
      <p className="service-description">{serviceDescription}</p>
      <button className="read-more-btn">Read More</button>
    </div>
  );
}

export default ServiceCard;
