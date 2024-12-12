import React, { useState } from "react";
import "../styles/Form.css";

const StatusForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
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
