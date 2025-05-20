import React from 'react';
import './LogoDesign.css';

const LogoDesign = () => {
  return (
    <div className="logo-design-container">
      <h1>Creative Logo Design</h1>
      <p>Your brand's identity starts with a memorable logo.</p>

      <div className="logo-gallery">
        <div className="logo-sample">
          <img
            src="https://source.unsplash.com/300x200/?abstract,logo"
            alt="Abstract Logo"
            className="logo-img"
          />
          <h3>Abstract</h3>
          <p>Bold shapes that convey your message uniquely.</p>
        </div>

        <div className="logo-sample">
          <img
            src="https://source.unsplash.com/300x200/?abstract,logo"
            alt="Minimalist Logo"
            className="logo-img"
          />
          <h3>Minimalist</h3>
          <p>Sleek and simple designs with lasting impact.</p>
        </div>

        <div className="logo-sample">
          <img
            src="https://source.unsplash.com/300x200/?typography,logo"
            alt="Typography Logo"
            className="logo-img"
          />
          <h3>Typography</h3>
          <p>Creative text-based logos that speak your brand.</p>
        </div>

        <div className="logo-sample">
          <img
            src="https://source.unsplash.com/300x200/?colorful,logo"
            alt="Colorful Logo"
            className="logo-img"
          />
          <h3>Colorful</h3>
          <p>Vibrant logos that grab attention immediately.</p>
        </div>

        <div className="logo-sample">
          <img
            src="https://source.unsplash.com/300x200/?modern,logo"
            alt="Modern Logo"
            className="logo-img"
          />
          <h3>Modern</h3>
          <p>Contemporary designs that reflect current trends.</p>
        </div>
      </div>
    </div>
  );
};

export default LogoDesign;
