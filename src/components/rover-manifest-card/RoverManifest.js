import React from "react";
import { format } from "date-fns";
import curiosity from "../../images/curiosity.png";
import perseverance from "../../images/perseverance.jpg";
import spirit_and_oppertunity from "../../images/spirit-opportunity.jpg";
import "./rover-manifest.styles.css";

function RoverManifest({ rover_data }) {
  const {
    landing_date,
    launch_date,
    max_sol,
    name,
    status,
    total_photos,
    cameras,
  } = rover_data;
  return (
    <div className="manifest-card-container">
      {/* rover image */}
      <img
        src={
          name === "Curiosity"
            ? curiosity
            : name === "Perseverance"
            ? perseverance
            : spirit_and_oppertunity
        }
        alt=""
        className="rover-image"
      />
      {/* rover name */}
      <div className="manifest-data-row">
        <span className="manifest-label">Rover Name:</span>
        <span className="manifest-label-value">"{name}"</span>
      </div>
      {/* rover launch date */}
      <div className="manifest-data-row">
        <span className="manifest-label">Launched On:</span>
        <span className="manifest-label-value">
          {format(new Date(launch_date), "dd MMM, yyyy")}
        </span>
      </div>
      {/* landed date */}
      <div className="manifest-data-row">
        <span className="manifest-label">Landed On:</span>
        <span className="manifest-label-value">
          {format(new Date(landing_date), "dd MMM, yyyy")}
        </span>
      </div>
      {/* solar days on mars */}
      <div className="manifest-data-row">
        <span className="manifest-label">Solar Days on Mars:</span>
        <span className="manifest-label-value">{max_sol}</span>
      </div>
      {/* solar days on mars */}
      <div className="manifest-data-row">
        <span className="manifest-label">Total Photos Taken:</span>
        <span className="manifest-label-value">{total_photos}</span>
      </div>
      {/* mission status */}
      <div className="manifest-data-row">
        <span className="manifest-label">Mission Status:</span>
        <span
          className={`manifest-label-value ${
            status === "complete"
              ? "complete"
              : status === "active"
              ? "active"
              : "danger"
          }`}
        >
          {status}
        </span>
      </div>

      {/* cameras */}
      <div className="manifest-data-row">
        <span className="manifest-label">No. of Cameras:</span>
        <span className="manifest-label-value">{cameras.length}</span>
      </div>
    </div>
  );
}

export default RoverManifest;
