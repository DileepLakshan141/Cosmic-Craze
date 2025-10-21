import React from "react";
import "./picture-card.styles.css";
import { format } from "date-fns";

function PictureCard({ metadata }) {
  const { links, data } = metadata;
  const { title, date_created } = data[0];
  return (
    <div className="picture-card-container">
      <img
        src={links[0].href}
        alt={data[0].nasa_id}
        className="picture-placeholder"
      />
      <div className="picture-card-content-container">
        <span className="picture-title">{title}</span>
        <span className="published-date">
          {format(new Date(date_created), "dd MMM, yyyy")}
        </span>
        <a
          href={links[0].href}
          target="_blank"
          className="image-library-source"
        >
          View Image
        </a>
      </div>
    </div>
  );
}

export default PictureCard;
