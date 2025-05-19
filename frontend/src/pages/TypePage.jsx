import React from "react";

import { useNavigate } from "react-router-dom";
import "./TypePage.css";

function TypePage() {
  const navigate = useNavigate();

  return (
    <div className="typepage-container">
      {/* Buyer Side */}
      <div
        className="half-section buyer-section"
        onClick={() => navigate("/signup2")}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if(e.key === "Enter") navigate("/signup2"); }}
      >
        <div className="overlay">
          <h2>Buyer Account</h2>
          <p>Explore products and make purchases.</p>
          <button className="btn btn-buyer">Create Your Buyer Account</button>
        </div>
      </div>

      {/* Seller Side */}
      <div
        className="half-section seller-section"
        onClick={() => navigate("/signupseller")}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if(e.key === "Enter") navigate("/signupseller"); }}
      >
        <div className="overlay">
          <h2>Seller Account</h2>
          <p>Manage your listings and track sales.</p>
          <button className="btn btn-seller">Create Your Seller Account</button>
        </div>
      </div>
    </div>
  );
}

export default TypePage;
