import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Unknown";
    setSender(storedUsername);

    ws.current = new WebSocket('ws://localhost:8081');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const msg = JSON.parse(reader.result);
            setMessages(prev => [...prev, msg]);
          } catch (err) {
            console.error("Failed to parse message JSON:", err);
          }
        };
        reader.readAsText(event.data);
      } else {
        try {
          const msg = JSON.parse(event.data);
          setMessages(prev => [...prev, msg]);
        } catch (err) {
          console.error("Failed to parse message JSON:", err);
        }
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = {
      text: input,
      sender: sender,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Send message as JSON string
    ws.current.send(JSON.stringify(newMessage));

    // Add message locally immediately so sender sees it right away
    setMessages(prev => [...prev, newMessage]);

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === sender ? 'right' : 'left'}`}
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
          placeholder="Message"
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
