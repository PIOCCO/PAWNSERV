import React, { useState } from "react";
import "./SettingPage.css";

const SettingsPage = () => {
  // Array of notification settings
  const [notifications, setNotifications] = useState([
    { id: 1, name: "Email Alerts", enabled: false },
    { id: 2, name: "SMS Alerts", enabled: false },
    { id: 3, name: "Push Notifications", enabled: false },
    { id: 4, name: "Slep mode", enabled: false },
  ]);

  // Toggle function to update state
  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const handleSave = () => {
    alert("Settings Saved!");
  };

  return (
    <div className="settings-container">
      <div className="settings-box">
        <h2>Settings</h2>

        {notifications.map((notif) => (
          <div key={notif.id} className="toggle-container">
            <span>{notif.name}</span>
            <input
              type="checkbox"
              checked={notif.enabled}
              onChange={() => toggleNotification(notif.id)}
            />
          </div>
        ))}

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsPage;
