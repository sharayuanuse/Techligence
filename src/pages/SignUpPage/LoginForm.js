// src/components/Auth/LoginForm.js
import React, { useState } from "react";
import "./SignUpModel.css"
import axios from 'axios'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, organization, role } = formData;
    if (!email || !password || !organization || !role) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Login form submitted:", formData);
    // Perform login logic here
    try {
      const res = await axios.post(`http://localhost:8000/api/${formData.organization.toLowerCase()}/login` , formData)
      console.log(res.data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      
      <p style={{ textAlign: "center" }}>
        <b> Login </b>
      </p>

      <input
        type="text"
        name="email"
        placeholder="email"
        value={formData.email}
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
