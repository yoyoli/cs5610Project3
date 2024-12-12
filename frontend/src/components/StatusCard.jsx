import React, { useState } from "react";
import "../styles/Card.css";
import { deleteStatus, updateStatus } from "../api/statusApi";
import { Link } from "react-router-dom";

const StatusCard = ({ username = "Unknown", content, createdAt, statusId, setStatuses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : "Invalid Date";

  const handleDelete = async () => {
    try {
      if (!statusId) throw new Error("Invalid status ID");
      await deleteStatus(statusId);
      setStatuses((prev) => prev.filter((status) => status._id !== statusId));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedStatus = await updateStatus(statusId, editedContent);
      setStatuses((prev) =>
        prev.map((status) =>
          status._id === statusId ? { ...status, content: updatedStatus.content } : status
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  return (
    <div className="status-card">
      <h3><Link to={`/user/${username}`}>{username}</Link></h3>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{content}</p>
      )}
      <small>{formattedDate}</small>
      <div className="status-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default StatusCard;
