import React, { useState } from "react";
import "./Student.css";
import axios from "axios";

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "password" || name === "confirmPassword") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Form submitted:", formData);

    try {
      const res = await axios.post(`http://localhost:8000/api/company/register` , {...formData , role: 'Teacher'})
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-signup-form">
      <p style={{ textAlign: "center" }}>
        <b>Teacher Signup : </b>
      </p>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
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
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="soft-input"
      />
      {error && <p className="error">{error}</p>}
      
      <label className="soft-checkbox">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          required
        />
        I accept the terms and conditions
      </label>
      <button type="submit" className="soft-button">
        Sign Up
      </button>
    </form>
  );
};

export default TeacherSignup;
