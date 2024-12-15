import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StatusCard from "../components/StatusCard";
import { updateUser, deleteUser } from "../api/userApi";

const API_URL = "https://shirui-li-project3-backend.onrender.com/api";

const UserPage = ({ user, setUser }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUsername, setEditingUsername] = useState("");
  const [editingPassword, setEditingPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${API_URL}/users/${username}`);
        setCurrentUser(userResponse.data.user);
        setStatuses(userResponse.data.statuses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (currentUser) {
      setEditingUsername(currentUser.username);
      setEditingPassword("");
    }
  }, [currentUser]);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleUpdate = async () => {
    if (!currentUser || !currentUser._id) {
      alert("User data is not loaded yet.");
      return;
    }
  
    try {
      const requestBody = {
        username: editingUsername.trim(),
        password: editingPassword.trim(),
      };
  
      if (!requestBody.username || !requestBody.password) {
        alert("Both username and password are required.");
        return;
      }
  
      console.log("Sending Request Body:", requestBody);
  
      const updatedUser = await axios.put(
        `${API_URL}/users/${currentUser._id}`,
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      setCurrentUser(updatedUser.data);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };
  

  const handleDelete = async () => {
    try {
      if (!currentUser || !currentUser._id) {
        alert("No user data to delete.");
        return;
      }
  
      await deleteUser(currentUser._id);
      alert("User deleted successfully!");
  
      setCurrentUser(null);
      if (setUser) {
        setUser(null);
      }
      navigate("/");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };
  

  return (
    <main className="user-container">
      <h1>{currentUser?.username || "User"}'s Profile</h1>
      <p>Joined on: {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}</p>

      <div>
        <h2>Edit User Information</h2>
        <label>
          New Username:
          <input
            type="text"
            value={editingUsername}
            onChange={(e) => setEditingUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={editingPassword}
            onChange={(e) => setEditingPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleUpdate}>Save Changes</button>
      </div>

      <button onClick={handleDelete} style={{ marginTop: "20px", color: "red" }}>
        Delete Account
      </button>

      <section className="status-list">
        {statuses.length > 0 ? (
          statuses.map((status) => (
            <StatusCard
              key={status._id}
              username={currentUser.username || "Unknown"}
              content={status.content}
              createdAt={status.createdAt}
              statusId={status._id}
              setStatuses={setStatuses}
              userID={currentUser._id}
              disableUsernameLink
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
