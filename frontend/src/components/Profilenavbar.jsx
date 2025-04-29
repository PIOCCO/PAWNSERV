import React from "react";
import { Link } from "react-router-dom";
import "./ProfileNavbar.css"; // Custom styling for profile navbar

const ProfileNavbar = () => {
  return (
    <nav className="profile-navbar">
      <div className="logo">{""}</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/chatroom">Chatroom</Link></li>
      </ul>
    </nav>
  );
};

export default ProfileNavbar;
