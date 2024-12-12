import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "../styles/Navbar.css";

const Navbar = ({ user }) => {

  return (
    <nav className="navbar">
      <a href="/">Home</a>
      {user ? (
        <>
          <span className="navbar-username">{user.username}</span>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
