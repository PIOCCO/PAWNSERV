import React, { useState, useEffect } from "react";
import "./UserPage.css";

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [error, setError] = useState(null);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("🔒 No token found. Please log in.");
        setUsername("Unknown");
        return;
      }

      try {
        const response = await fetch("http://localhost:9090/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid server response");
        }

        const data = await response.json();
        if (!data.username) {
          throw new Error("Username not found in response");
        }

        setUsername(data.username);
      } catch (err) {
        console.error("❌ Error fetching user data:", err);
        setError("Failed to load user profile.");
        setUsername("Unknown");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Profile Header */}
      <div className="profile-header">
        <img
          className="profile-pic"
          src="/images/profile-pic.jpg"
          alt="Profile"
        />
        <div className="profile-info">
          <h2 className="username">{username}</h2>
          <div className="stats">
            <span><strong>120</strong> posts</span>
            <span><strong>5.2k</strong> followers</span>
            <span><strong>600</strong> following</span>
          </div>
          <p className="bio">🚀 Web Developer | 🌍 Tech Enthusiast</p>
          <button
            className={isFollowing ? "following" : "follow-btn"}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="posts-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <img
            key={index}
            src="/images/post-pic.jpg"
            alt="User post"
            className="post"
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
