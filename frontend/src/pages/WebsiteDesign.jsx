import React from 'react';
import './WebsiteDesign.css';

const WebsiteDesign = () => {
  return (
    <div className="website-design-container">
      
      <section className="hero">
        <h1>Professional Website Design</h1>
        <p>Modern, responsive, and user-focused web solutions tailored for your business.</p>
        <button className="btn-get-started">Get Started</button>
      </section>
      
      <section className="features">
        <h2>Our Features</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Responsive Design</h3>
            <p>Your site looks perfect on any device, from phones to desktops.</p>
          </div>
          <div className="card">
            <h3>SEO Optimization</h3>
            <p>Improve your search rankings and get more organic traffic.</p>
          </div>
          <div className="card">
            <h3>Performance Tuning</h3>
            <p>Fast loading times and smooth experiences for your users.</p>
          </div>
          <div className="card">
            <h3>Custom Animations</h3>
            <p>Engage visitors with eye-catching interactive elements.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>We’re here whenever you need help or updates.</p>
          </div>
          <div className="card">
            <h3>Scalable Solutions</h3>
            <p>Grow your website alongside your business needs.</p>
          </div>
        </div>
      </section>

      <section className="process">
        <h2>Our Design Process</h2>
        <ol>
          <li><strong>Discovery:</strong> Understand your brand and goals.</li>
          <li><strong>Planning:</strong> Wireframes and user flow design.</li>
          <li><strong>Design:</strong> Creative and modern UI development.</li>
          <li><strong>Development:</strong> Coding with best practices.</li>
          <li><strong>Testing:</strong> Quality assurance and feedback cycles.</li>
          <li><strong>Launch:</strong> Deploy your stunning new website.</li>
        </ol>
      </section>

 
      <section className="cta">
        <h2>Ready to Elevate Your Online Presence?</h2>
        <button className="btn-contact-us">Contact Us Today</button>
      </section>
    </div>
  );
};

export default WebsiteDesign;
