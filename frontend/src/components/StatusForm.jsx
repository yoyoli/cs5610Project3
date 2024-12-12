import React, { useState } from "react";
import "../styles/Form.css";

const StatusForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (content) => {
    try {
        await createStatus(user._id, content);
        fetchStatuses();
    } catch (err) {
        console.error(err);
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
