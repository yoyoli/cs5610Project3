//import React from 'react';
import React, { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from "./context/AuthContext";
import { StatusProvider } from "./context/StatusContext";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <StatusProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  onLogin={(userData, navigate) => {
                    console.log('Logged in user:', userData);
                    setUser(userData); // set login user
                    navigate('/'); // redirect to home after log in
                  }}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </Router>
      </StatusProvider>
    </AuthProvider>
  );
};

export default App;