import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import RoverManifest from "../../components/rover-manifest-card/RoverManifest";
import ScreenLoader from "../screen-loader/ScreenLoader";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import "./rover-missions.styles.css";

function RoverMissions() {
  const [missionData, setMissionData] = useState(null);
  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;

  // function for get rover mission data
  const getRoverMissionManifests = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${NASA_API_KEY}`
      );

      if (response) {
        setMissionData(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getRoverMissionManifests();
  }, [NASA_API_KEY, setMissionData]);

  return missionData !== null ? (
    <div
      className="rmm-main-container"
      style={{ backgroundImage: `url(${GalaxyBlack})` }}
    >
      <div className="rmm-opacity-layer"></div>
      <span className="rmm-page-title">Rover Mission Manifests</span>

      {/* rover manifgests container */}
      <div className="rmm-manifests-container">
        {missionData.rovers.map((rover) => {
          return <RoverManifest key={rover.id} rover_data={rover} />;
        })}
      </div>
    </div>
  ) : (
    <ScreenLoader />
  );
}

export default RoverMissions;
