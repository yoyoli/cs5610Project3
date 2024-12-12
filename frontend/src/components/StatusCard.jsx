import React from "react";
import "../styles/Card.css";

const StatusCard = ({ username, content, createdAt }) => {
  const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : "Invalid Date";

  return (
    <div className="status-card">
      <h3>{username}</h3>
      <p>{content}</p>
      <small>{formattedDate}</small>
    </div>
  );
};

export default StatusCard;
