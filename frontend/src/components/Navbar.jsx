import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <a href="/">Home</a>
      {user ? (
        <>
          <span>Welcome, {user.username}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
