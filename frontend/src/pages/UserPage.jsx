import React, { useState } from "react";
import "./UserPage.css";

const UserProfile = () => {
  const [followers, setFollowers] = useState(500); // Start with 500 followers

  const incrementFollowers = () => {
    setFollowers(followers + 1); // Increase followers count by 1
  };

  return (
    <div className="container">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="avatar"
        />
        <h2 className="username">John Doe</h2>
        <p className="bio">Web Developer | Tech Enthusiast</p>
        <div className="stats">
          <div>
            <span className="number">120</span>
            <span className="label">Posts</span>
          </div>
          <div>
            <span className="number">{followers}</span> {/* Dynamic followers count */}
            <span className="label">Followers</span>
          </div>
          <div>
            <span className="number">300</span>
            <span className="label">Following</span>
          </div>
        </div>

        <button onClick={incrementFollowers} className="follow-btn">Follow</button>
      </div>
    </div>
  );
};

export default UserProfile;
