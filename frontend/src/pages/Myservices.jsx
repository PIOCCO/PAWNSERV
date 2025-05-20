import React from "react";
import "./Myservices.css";

const services = [
  {
    title: "Website Development",
    description: "Responsive, high-performance websites built with modern tech.",
    image: "https://source.unsplash.com/800x600/?website,design"
  },
  {
    title: "WordPress Customization",
    description: "Custom themes, plugins, and optimization tailored to your needs.",
    image: "https://source.unsplash.com/800x600/?wordpress,developer"
  },
  {
    title: "Logo Design",
    description: "Creative logos that capture the essence of your brand.",
    image: "https://source.unsplash.com/800x600/?logo,branding"
  },
  {
    title: "AI-Powered Chatbots",
    description: "Automate conversations with smart, NLP-driven AI bots.",
    image: "https://source.unsplash.com/800x600/?chatbot,ai"
  },
  {
    title: "SEO Optimization",
    description: "Boost your Google rankings and grow your audience organically.",
    image: "https://source.unsplash.com/800x600/?seo,analytics"
  }
];

const Myservices = () => {
  return (
    <div className="myservices-container">
      <h1>🌟 My Services</h1>
      <p className="intro-text">Explore a wide range of professional digital solutions tailored for your business growth.</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-img" />
            <div className="service-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myservices;
