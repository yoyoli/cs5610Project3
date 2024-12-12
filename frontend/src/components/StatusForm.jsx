import React, { useState } from "react";
import "../styles/Form.css";
import { createStatus } from "../api/statusApi";

const StatusForm = ({ user, setStatuses }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const newStatus = await createStatus(user._id, content);
      setStatuses((prev) => [newStatus, ...prev]);
      setContent("");
    } catch (error) {
      console.error("Fail to post:", error);
    }
  };


  return (
    <form className="status-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default StatusForm;
