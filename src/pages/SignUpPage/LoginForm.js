import React, { useState } from "react";
import "./SignUpModel.css";
import axios from 'axios'

const organizationOptions = [
  { value: "", label: "Select Organization" },
  { value: "Institute", label: "Institute" },
  { value: "Company", label: "Company" },
  { value: "VC", label: "VC" },
];

const roleOptions = {
  Institute: [
    { value: "", label: "Select Role" },
    { value: "Teacher", label: "Teacher" },
    { value: "Student", label: "Student" },
    { value: "Admin", label: "Admin" },
  ],
  Company: [
    { value: "", label: "Select Role" },
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
  ],
  VC: [
    { value: "", label: "Select Role" },
    { value: "User", label: "User" },
    { value: "Admin", label: "Admin" },
  ],
};

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

  const getRoleOptions = () => {
    if (!formData.organization) {
      return [{ value: "", label: "Select Organization First" }];
    }
    return roleOptions[formData.organization];
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <p style={{ textAlign: "center" }}>
        <b>Login</b>
      </p>

      <input
        type="text"
        name="email"
        placeholder="Email"
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
      <select
        name="organization"
        value={formData.organization}
        onChange={handleChange}
        required
        className="soft-input"
      >
        {organizationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="soft-input"
        disabled={!formData.organization}
      >
        {getRoleOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
