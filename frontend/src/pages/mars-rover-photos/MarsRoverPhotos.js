import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import axios from "axios";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import ScreenLoader from "../screen-loader/ScreenLoader";
import RoverPhoto from "../../components/rover-photo-card/RoverPhoto";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import NoResults from "../../images/logo/Logo-White.png";
import "./mars-photos.styles.css";

function MarsRoverPhotos() {
  const roverInfo = [
    {
      name: "curiosity",
      cameras: ["fhaz", "rhaz", "mast", "chemcam", "mahli", "mardi", "navcam"],
      min_date: "2012-08-06",
      max_date: "2024-02-19",
    },
    {
      name: "opportunity",
      cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
      min_date: "2004-01-04",
      max_date: "2010-03-21",
    },
    {
      name: "spirit",
      cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
      min_date: "2004-01-25",
      max_date: "2018-06-11",
    },
  ];

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
  const [optionContainerVisibility, setOptionContainerVisibility] =
    useState(false);
  const [rover, setRover] = useState(roverInfo[0]);
  const [camera, setCamera] = useState(rover.cameras[0]);
  const [earthDate, setEarthDate] = useState(rover.max_date);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {}, [setRover]);

  const showFilterOptions = () => {
    setOptionContainerVisibility(!optionContainerVisibility);
  };

  const dateValidator = () => {
    const pickedDate = new Date(earthDate);
    const minDate = new Date(rover.min_date);
    const maxDate = new Date(rover.max_date);

    return pickedDate >= minDate && pickedDate <= maxDate;
  };

  const getRoverPhotos = async () => {
    if (!dateValidator()) {
      toast.error("Selected date is not in valid period!");
      return;
    }
    setOptionContainerVisibility(false);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.name}/photos?earth_date=${earthDate}&camera=${camera}&api_key=${NASA_API_KEY}`
      );

      if (response.data) {
        setResults(response.data);
      } else {
        toast.error("Some error occured! Try again!");
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <ScreenLoader />
  ) : (
    <div
      className="mrp-main-container"
      style={{ backgroundImage: `url(${GalaxyBlack})` }}
    >
      <div className="mrp-opacity-layer"></div>

      <span className="mrp-page-title">Mars Rover Photos</span>

      <div className="mrp-search-filter-container">
        <div
          className="filter-toggle-container"
          onClick={() => showFilterOptions()}
        >
          <span className="toggle-filter-text">
            {optionContainerVisibility ? "Hide " : "Show "} Search Options
          </span>
          <button className="toggle-filter-btn">
            {optionContainerVisibility ? (
              <BiSolidHide className="toggle-filter-icon" />
            ) : (
              <BiSolidShow className="toggle-filter-icon" />
            )}
          </button>
        </div>
        <hr className="mrp-filter-option-divider" />

        {/* search option holder partition */}
        <div
          className={`mrp-search-option-partition ${
            optionContainerVisibility ? "partition-show" : "partition-hide"
          }`}
        >
          {/* select rover name */}
          <div className="mrp-label">Rover Name</div>
          <div className="filter-btn-container">
            {roverInfo.map((currentRover, index) => {
              return (
                <button
                  key={index}
                  className={`mrp-filter-btn ${
                    rover.name === currentRover.name ? "mrp-btn-active" : ""
                  }`}
                  onClick={() => setRover(currentRover)}
                >
                  {currentRover.name}
                </button>
              );
            })}
          </div>

          {/* select rover camera */}
          <div className="mrp-label">Rover Camera</div>
          <div className="filter-btn-container">
            {rover.cameras.map((currentCamera, index) => {
              return (
                <button
                  onClick={() => setCamera(currentCamera)}
                  className={`mrp-filter-btn ${
                    camera === currentCamera ? "mrp-btn-active" : ""
                  }`}
                  key={index}
                >
                  {currentCamera}
                </button>
              );
            })}
          </div>

          {/* select date */}
          <div className="mrp-label">Date of Picture</div>
          <input
            type="date"
            min={rover.min_date}
            max={rover.max_date}
            className="mrp-date-picker"
            onChange={(e) => setEarthDate(e.target.value)}
            value={format(earthDate, "yyyy-MM-dd")}
          />
          <span className="date-condition">
            Please choose a date between {rover.min_date} and {rover.max_date}*
          </span>

          <button
            className="get-rover-photos-btn"
            onClick={() => getRoverPhotos()}
          >
            Check for Photos
          </button>
        </div>
      </div>

      {results !== null && results.photos.length > 0 ? (
        <div className="mrp-search-result-displayer">
          {results.photos.map((photo) => {
            return <RoverPhoto key={photo.id} metadata={photo} />;
          })}
        </div>
      ) : (
        <div className="no-results-container">
          {results === null ? (
            <></>
          ) : (
            <img
              src={NoResults}
              alt="no-results"
              className="no-results-placeholder-image"
            />
          )}
          <span className="no-results-text">
            {results === null ? "" : "No Photos Found!"}
          </span>
        </div>
      )}
    </div>
  );
}

export default MarsRoverPhotos;
