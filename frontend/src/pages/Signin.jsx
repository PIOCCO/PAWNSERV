import React from "react";
import { Link } from "react-router-dom";
import "./Signin.css"; // Import the CSS file

const Signin = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>

        {/* Sign In Form */}
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

          <button type="submit" className="signin-btn">Sign In</button>

          {/* Google Sign In */}
          <button type="button" className="google-btn">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
            Sign in with Google
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

export default Signin;
