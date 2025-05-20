import React from 'react';
import './AIServices.css';

const AIServices = () => {
  return (
    <div className="ai-container">
      <h1>AI-Powered Solutions</h1>
      <p>Leverage artificial intelligence to automate and optimize your workflows.</p>

      <div className="ai-grid">
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?chatbot,ai" alt="Chatbots" />
          <h3>Chatbots</h3>
          <p>Automated support to enhance customer experience 24/7.</p>
        </div>
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?data,analytics" alt="Data Analysis" />
          <h3>Data Analysis</h3>
          <p>Unlock insights from your data with machine learning.</p>
        </div>
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?image,recognition" alt="Image Recognition" />
          <h3>Image Recognition</h3>
          <p>Identify and classify objects, faces, and patterns in images.</p>
        </div>
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?automation,ai" alt="Process Automation" />
          <h3>Process Automation</h3>
          <p>Boost efficiency by automating repetitive business tasks.</p>
        </div>
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?nlp,language" alt="Natural Language Processing" />
          <h3>Natural Language Processing</h3>
          <p>Understand, interpret, and generate human language.</p>
        </div>
        <div className="ai-card">
          <img src="https://source.unsplash.com/300x200/?robotics,ai" alt="AI Robotics" />
          <h3>AI in Robotics</h3>
          <p>Empowering intelligent machines for real-world tasks.</p>
        </div>
      </div>
    </div>
  );
};

export default AIServices;
