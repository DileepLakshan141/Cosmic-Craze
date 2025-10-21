import React, { useState, useEffect } from "react";
import axios from "axios";
import ScreenLoader from "../screen-loader/ScreenLoader";
import Alert from "../../components/notification-alert/Alert";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import "./space-weather.styles.css";

function SpaceWeatherAlerts() {
  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
  const [spaceWeatherAlerts, setSpaceWeatherAlerts] = useState(null);
  const [originalAlertArray, setOriginalAlertArray] = useState(null);
  const [startFrom, setStartFrom] = useState("");
  const [endFrom, setEndFrom] = useState("");
  const [activeAlertType, setActiveAlertType] = useState("all");

  const getDateCalculated = (dayCount) => {
    if (isNaN(dayCount)) {
      console.log("dayCount must be an integer! invalid param passed!");
      return;
    }

    let today = new Date();
    let lastDate = new Date(today);
    lastDate.setDate(today.getDate() - dayCount);

    let endDate = format(new Date(today), "yyyy-MM-dd");
    let startDate = format(new Date(lastDate), "yyyy-MM-dd");

    setEndFrom(endDate);
    setStartFrom(startDate);
  };

  const getSpaceWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/DONKI/notifications?&type=all&api_key=${NASA_API_KEY}`
      );
      if (response) {
        setSpaceWeatherAlerts(response.data);
        setOriginalAlertArray(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filterAlerts = (type) => {
    setActiveAlertType(type);

    if (type === "ALL") {
      setSpaceWeatherAlerts(originalAlertArray);
      return;
    }

    const filteredAlerts = originalAlertArray.filter((alert) => {
      return alert.messageType === type;
    });

    setSpaceWeatherAlerts(filteredAlerts);
  };

  useEffect(() => {
    getDateCalculated(30);
    getSpaceWeatherData();
    filterAlerts("ALL");
  }, [NASA_API_KEY]);

  return spaceWeatherAlerts ? (
    <div
      className="swa-main-container"
      style={{ backgroundImage: `url(${GalaxyBlack})` }}
    >
      <div className="swa-opacity-layer"></div>
      <span className="swa-page-title">Space Weather Alerts</span>

      <div className="swa-filter-options-container">
        <span className="swa-sub-label">
          From:
          <span className="swa-value-holder">{startFrom}</span>
        </span>
        <span className="swa-sub-label">
          Until:
          <span className="swa-value-holder">{endFrom}</span>
        </span>
        <span className="swa-sub-label">Filter By:</span>
        <div className="filter-by-btn-container">
          <button
            className={`filter-by-btn ${
              activeAlertType === "ALL" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("ALL")}
          >
            All
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "CME" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("CME")}
          >
            CME
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "FLR" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("FLR")}
          >
            FLR
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "SEP" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("SEP")}
          >
            SEP
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "IPS" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("IPS")}
          >
            IPS
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "MPC" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("MPC")}
          >
            MPC
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "Report" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("Report")}
          >
            Report
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "GMS" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("GMS")}
          >
            GMS
          </button>
          <button
            className={`filter-by-btn ${
              activeAlertType === "RBE" ? "swa-btn-active" : ""
            }`}
            onClick={() => filterAlerts("RBE")}
          >
            RBE
          </button>
        </div>
      </div>

      <div className="swa-alert-displayer">
        {spaceWeatherAlerts.map((alert) => {
          return <Alert alert={alert} key={alert.messageID} />;
        })}
      </div>
    </div>
  ) : (
    <ScreenLoader />
  );
}

export default SpaceWeatherAlerts;
