import React from "react";
import "./Home.css"; // Custom CSS for styling

const Home = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Welcome to Our World</h1>
        <p>Join us and explore endless possibilities</p>
        <button className="cta-button" onClick={() => alert("Let's go!")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
