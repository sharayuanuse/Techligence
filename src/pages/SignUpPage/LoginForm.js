// src/components/Auth/LoginForm.js
import React, { useState } from "react";
import "./SignUpModel.css"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    organization: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, organization, role } = formData;
    if (!username || !password || !organization || !role) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Login form submitted:", formData);
    // Perform login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      
      <p style={{ textAlign: "center" }}>
        <b> Login </b>
      </p>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="soft-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="soft-input"
      />
      <input
        type="text"
        name="organization"
        placeholder="Organization"
        value={formData.organization}
        onChange={handleChange}
        required
        className="soft-input"
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        required
        className="soft-input"
      />

      <div style={{ textAlign: "right", width: "100%" }}>
        <a href="#" className="forgot-password-link">
          Forgot Password?
        </a>
      </div>
      <button type="submit" className="soft-button">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
