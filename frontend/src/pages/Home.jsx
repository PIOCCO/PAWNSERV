import React from "react";
import "./Home.css"; // Make sure it includes styles for both hero and contact

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          <h1>Welcome to Our World</h1>
          <p>Join us and explore endless possibilities</p>
          <button className="cta-button" onClick={() => alert("Let's go!")}>
            Get Started
          </button>
        </div>
      </div>
      <section className="contact-section">
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p>Have a question or just want to say hello? We'd love to hear from you.</p>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button className="cta-button" type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
