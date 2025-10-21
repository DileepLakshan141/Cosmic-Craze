import React from "react";
import "./rover-photo.styles.css";
import { format } from "date-fns";

function RoverPhoto({ metadata }) {
  const { camera, earth_date, rover, img_src } = metadata;
  return (
    <div className="rover-card-container">
      <img src={img_src} alt={camera.name} className="rover-pic-placeholder" />
      <div className="rover-card-content-container">
        <span className="rover-name">{rover.name}</span>
        <span className="cam-name">{camera.full_name}</span>
        <span className="taken-date">
          {format(new Date(earth_date), "dd MMM, yyyy")}
        </span>
        <a href={img_src} target="_blank" className="rover-photo-source">
          View Image
        </a>
      </div>
    </div>
  );
}

export default RoverPhoto;
