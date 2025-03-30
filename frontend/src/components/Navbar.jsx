import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component
import SearchBar from "./Searchbar";
import "./Navbar.css"; // Import Navbar CSS
import logo from "../assets/PAWNN1.png";


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar when clicked
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
  <img src={logo} alt="Logo" style={{ width: "300", height: "auto" }} />
      </Link>

      <SearchBar />

      {/* Right Links */}
      <div className="nav-links right-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>

        {/* Sidebar Icon (Near Login) */}
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
    </nav>
  );
};

export default Navbar;
