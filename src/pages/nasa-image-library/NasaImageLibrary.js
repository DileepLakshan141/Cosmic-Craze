import React, { useState } from "react";
import axios from "axios";
import "./image-library.styles.css";
import { ImSearch } from "react-icons/im";
import { toast } from "react-hot-toast";
import ScreenLoader from "../screen-loader/ScreenLoader";
import GalaxyBlack from "../../images/galaxy-black.jpg";
import NoResults from "../../images/logo/Logo-White.png";
import PictureCard from "../../components/picture-card/PictureCard";

function NasaImageLibrary() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(null);

  const executeImageSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchQuery}`
      );

      if (response) {
        setSearchResults(response.data.collection.items);
      }
      setLoading(false);
      setSearchQuery("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return loading ? (
    <ScreenLoader data-testid="screen-loader" />
  ) : (
    <div
      className="nil-main-container"
      style={{ backgroundImage: `url(${GalaxyBlack})` }}
    >
      <div className="nil-opacity-layer"></div>
      <span className="nil-page-title">NASA Image Library</span>

      {/* search bar container */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-input-field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter the search prompt"
        />
        <button
          data-testid="search-button"
          className="search-btn"
          onClick={() => executeImageSearch()}
        >
          <ImSearch className="nil-search-btn-icon" />
        </button>
      </div>

      {/* search results container */}
      <div className="nil-search-result-displayer">
        {searchResults !== null && searchResults.length > 0 ? (
          searchResults.map((result) => {
            if (result.data[0].media_type === "image") {
              return (
                <PictureCard metadata={result} key={result.data[0].nasa_id} />
              );
            } else {
              return "";
            }
          })
        ) : (
          <div className="no-results-container">
            {searchResults === null ? (
              <></>
            ) : (
              <img
                src={NoResults}
                alt="no-results"
                className="no-results-placeholder-image"
              />
            )}
            <span className="no-results-text">
              {searchResults === null ? "" : "No Images Found!"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default NasaImageLibrary;
