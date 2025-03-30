import React, { useState } from "react";
import "./signupseller.css";

function Signupseller() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    storeName: "",
    businessCategory: [],
    contactNumber: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, businessCategory: options });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!/^[0-9]{8,15}$/.test(formData.contactNumber)) {
      alert("Please enter a valid contact number (8-15 digits).");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/signup/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Signup successful!");
      } else {
        alert(result.error || "Signup failed! Please check your details.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Seller Account Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="storeName"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Business Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="businessCategory"
            multiple
            value={formData.businessCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="ecommerce">E-commerce</option>
            <option value="freelance">Freelance Services</option>
            <option value="consulting">Consulting</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number (8-15 digits)"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe your services (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />

          <button type="submit">Create Seller Account</button>
        </form>
      </div>
    </div>
  );
}

export default Signupseller;
