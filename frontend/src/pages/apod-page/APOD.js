import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ScreenLoader from "../screen-loader/ScreenLoader";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import "./apod.styles.css";

function APOD() {
  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY;
  const [astronomicPictureData, setAstronomicPictureData] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [expandedDatePicker, setExpandedDatePicker] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date().toISOString());

  const showExplanation = () => {
    setExpandedDescription(!expandedDescription);
  };

  const showDatePicker = () => {
    setExpandedDatePicker(!expandedDatePicker);
  };

  const getAPOD = async () => {
    const requestedDate = format(pickedDate, "yyyy-MM-dd");
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${requestedDate}`
      );
      if (response) {
        setAstronomicPictureData(response.data);
        toast.success("APOD updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAstronomicData = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
      );
      if (response) {
        setAstronomicPictureData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAstronomicData();
  }, [NASA_API_KEY, setAstronomicPictureData]);

  let pictureDate = astronomicPictureData
    ? format(astronomicPictureData.date, "dd MMMM, yyyy")
    : "loading";

  return astronomicPictureData ? (
    <div
      className="apod-container"
      style={{ backgroundImage: `url(${astronomicPictureData.url})` }}
    >
      {/* this is for large screens */}
      <div className="apod-opacity-layer">
        <div
          style={{ backgroundImage: `url(${astronomicPictureData.url})` }}
          className="apod-picture-contained-view"
        ></div>
      </div>

      <span className="apod-page-title">astronomic picture of the day</span>
      <span className="apod-pic-topic">{astronomicPictureData.title}</span>
      <span className="apod-date">{pictureDate}</span>
      <div className="apod-explanation-container">
        <button className="apod-expand-btn" onClick={() => showExplanation()}>
          {expandedDescription ? "Hide " : "Show "} Explanation
          {expandedDescription ? (
            <BiSolidHide className="visible-icon" />
          ) : (
            <BiSolidShow className="visible-icon" />
          )}
        </button>
        <p
          className={`apod-description ${
            expandedDescription ? "expand" : "shrink"
          }`}
        >
          {astronomicPictureData.explanation}
        </p>
        <button className="apod-expand-btn" onClick={() => showDatePicker()}>
          Get APOD of Your Birthday
          {expandedDatePicker ? (
            <BiSolidHide className="visible-icon" />
          ) : (
            <BiSolidShow className="visible-icon" />
          )}
        </button>
        <div
          className={`apod-date-picker-container ${
            expandedDatePicker ? "expand" : "shrink"
          }`}
        >
          <input
            type="date"
            min="1995-01-01"
            max={new Date().toISOString().split("T")[0]}
            className="apod-date-picker"
            onChange={(e) => setPickedDate(e.target.value)}
            value={format(pickedDate, "yyyy-MM-dd")}
          />
          <button className="get-apod-btn" onClick={() => getAPOD()}>
            Get APOD
          </button>
        </div>
      </div>
    </div>
  ) : (
    <ScreenLoader />
  );
}

export default APOD;
