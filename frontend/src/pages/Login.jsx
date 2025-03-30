import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {/* Login Form */}
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>

          {/* Google Login */}
          <button type="button" className="google-btn">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
            Login with Google
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
