import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StatusCard from "../components/StatusCard";

const API_URL = "http://localhost:8000/api";

const UserPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${API_URL}/users/${username}`);
        setUser(userResponse.data.user);
        setStatuses(userResponse.data.statuses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="user-container">
      <h1>{user.username}'s Profile</h1>
      <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
      <section className="status-list">
        {statuses.length > 0 ? (
          statuses.map((status) => (
            <StatusCard
              key={status._id}
              username={user.username || "Unknown"}
              content={status.content}
              createdAt={status.createdAt}
              statusId={status._id}
            />
          ))
        ) : (
          <p>No status updates available.</p>
        )}
      </section>
    </main>
  );
};

export default UserPage;
