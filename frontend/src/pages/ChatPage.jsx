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
      let data = null;

      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            data = JSON.parse(reader.result);
            setMessages(prev => [...prev, data]);
          } catch (err) {
            console.warn("Message is not valid JSON, using raw text");
            setMessages(prev => [...prev, { text: reader.result, sender: "unknown", timestamp: new Date().toLocaleTimeString() }]);
          }
        };
        reader.readAsText(event.data);
      } else {
        try {
          data = JSON.parse(event.data);
          setMessages(prev => [...prev, data]);
        } catch (err) {
          console.warn("Message is not valid JSON, using raw text");
          setMessages(prev => [...prev, { text: event.data, sender: "unknown", timestamp: new Date().toLocaleTimeString() }]);
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

    // Send message as JSON string to server
    ws.current.send(JSON.stringify(newMessage));

    // Do NOT add message locally here to avoid duplication

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
