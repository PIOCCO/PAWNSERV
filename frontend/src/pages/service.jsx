import React from "react";
import "./service.css"; // Import the CSS file

export default function UserProfiles() {
  const users = [
    { id: 1, name: "John Doe", posts: 120, followers: 500, following: 300 },
    { id: 2, name: "Jane Smith", posts: 95, followers: 420, following: 280 },
    { id: 3, name: "Alice Johnson", posts: 80, followers: 380, following: 250 },
    { id: 4, name: "Michael Brown", posts: 150, followers: 600, following: 350 },
    { id: 1, name: "John Doe", posts: 120, followers: 500, following: 300 },
    { id: 2, name: "Jane Smith", posts: 95, followers: 420, following: 280 },
    { id: 3, name: "Alice Johnson", posts: 80, followers: 380, following: 250 },
    { id: 4, name: "Michael Brown", posts: 150, followers: 600, following: 350 },
    { id: 1, name: "John Doe", posts: 120, followers: 500, following: 300 },
    { id: 2, name: "Jane Smith", posts: 95, followers: 420, following: 280 },
    { id: 3, name: "Alice Johnson", posts: 80, followers: 380, following: 250 },
    { id: 4, name: "Michael Brown", posts: 150, followers: 600, following: 350 },
    { id: 3, name: "Alice Johnson", posts: 80, followers: 380, following: 250 },
    { id: 4, name: "Michael Brown", posts: 150, followers: 600, following: 350 },
    { id: 3, name: "Alice Johnson", posts: 80, followers: 380, following: 250 },
    { id: 4, name: "Michael Brown", posts: 150, followers: 600, following: 350 },
  ];

  return (
    <div className="profile-container">
      {users.map((user) => (
        <div key={user.id} className="profile-card">
          <img src="https://via.placeholder.com/50" alt="User Avatar" className="avatar" />
          <h2 className="name">{user.name}</h2>
          <p className="bio">Web Developer | Tech Enthusiast</p>
          <div className="stats">
            <div><span className="bold">{user.posts}</span> Posts</div>
            <div><span className="bold">{user.followers}</span> Followers</div>
            <div><span className="bold">{user.following}</span> Following</div>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
      ))}
    </div>
  );
}
