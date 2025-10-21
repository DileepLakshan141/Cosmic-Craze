import React from "react";
import "./alert.styles.css";
import { format } from "date-fns";

function Alert({ alert }) {
  const { messageType, messageIssueTime, messageURL } = alert;

  return (
    <div className="alert-container">
      <div className="alert-issue-date-partition">
        <span className="issued-date">
          {format(new Date(messageIssueTime), "dd")}
        </span>
        <span className="issued-month">
          {format(new Date(messageIssueTime), "MMM, yyyy")}
        </span>
      </div>
      <div className="alert-message-body-partition">
        <span className="alert-type">
          {messageType === "CME"
            ? "Coronal Mass Ejection"
            : messageType === "FLR"
            ? "Solar Flare"
            : messageType === "SEP"
            ? "Solar Energetic Particle Event"
            : messageType === "IPS"
            ? "Interplanetary Shock"
            : messageType === "MPC"
            ? "Magnetopause Crossing"
            : messageType === "Report"
            ? "Report"
            : messageType === "GST"
            ? "Geomagnetic Storm"
            : messageType === "RBE"
            ? "Radiation Belt Enhancement"
            : messageType}
        </span>
        <a className="alert-more-info" href={messageURL} target="_blank">
          Read Full Alert
        </a>
      </div>
    </div>
  );
}

export default Alert;
