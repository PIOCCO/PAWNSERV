import React from "react";
import { useNavigate } from "react-router-dom";
import "./TypePage.css"; // Import CSS

function TypePage() {
  const navigate = useNavigate();

  return (
    <div className="user-page">
      {/* Left Side - Buyer */}
      <div className="buyer-section">
        <h2>Buyer Account</h2>
        <p>Explore products and make purchases.</p>
        <button onClick={() => navigate("/signup2")}>
          Create Your Buyer Account
        </button>
      </div>

      {/* Right Side - Seller */}
      <div className="seller-section">
        <h2>Seller Account</h2>
        <p>Manage your listings and track sales.</p>
        <button onClick={() => navigate("/signupseller")}>
          Create Your Seller Account
        </button>
      </div>
    </div>
  );
}

export default TypePage;
