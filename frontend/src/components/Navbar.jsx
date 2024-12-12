import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <a href="/">Home</a>
      {user ? (
        <>
          <span className="navbar-username">{user.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
      <Link to="/register">Create Account</Link>
    </nav>
  );
};

export default Navbar;
