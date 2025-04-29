import React, { useState } from 'react';
import './ChatPage.css'; // Import the external stylesheet

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('User1');

  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      text: input,
      sender: sender,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
    setSender(sender === 'User1' ? 'User2' : 'User1');
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'User1' ? 'left' : 'right'}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
            <div className="timestamp">{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="chat-input"
          type="text"
          placeholder={`Message as ${sender}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
