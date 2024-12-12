import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import { AuthContext } from "../context/AuthContext";

const UserPage = ({ username }) => {
  const { user } = useContext(AuthContext);

  const isCurrentUser = user && user.username === username;

  return (
    <>
      <Navbar />
      <main className="user-container">
        <h1>{username}'s Profile</h1>
        <p>Joined on: 2024-01-01</p>
        {isCurrentUser && <button>Edit Profile</button>}
        <section className="status-list">
          {/* User's status update */}
          <StatusCard username={username} content="User's status update" />
        </section>
      </main>
    </>
  );
};

export default UserPage;
