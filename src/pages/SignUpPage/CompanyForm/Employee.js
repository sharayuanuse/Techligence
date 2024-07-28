import React, { useState, useEffect } from "react";
import OTPVerification from "../VC/OTPVerification";
import "./Roles.css";
import axios from "axios";
import TermsAndConditions from "../../TermsAndConditions";

const EmployeeSignup = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    termsAccepted: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);

  useEffect(() => {
    setIsVerifyDisabled(isEmailVerified);
  }, [isEmailVerified]);

  const validatePassword = (password) => {
    const isValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (isValid) {
      setPasswordMessage("Password is strong");
    } else {
      setPasswordMessage(
        "Password must be at least 8 characters, contain uppercase and lowercase letters, numbers, and special characters"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "password" || name === "confirmPassword") {
        setError("");
      if (name === "password") {
        validatePassword(value);
      }
    }
    if (name === "email") {
      setIsEmailVerified(false); 
    }
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    if (formData.password) {
      validatePassword(formData.password);
    }
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    if (!isEmailVerified) {
      setError("Please verify your email before signing up.");
      return;
    }

    console.log("Form submitted:", formData);

    try {
      const res = await axios.post(`http://localhost:8000/api/company/register`, {
        ...formData,
        role: "Employee",
      });
      console.log(res.data.message);
      setSuccess(res.data.message);
      // Reset form data upon successful signup
      setFormData({
        password: "",
        confirmPassword: "",
        email: "",
        termsAccepted: false,
      });
      setIsEmailVerified(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:8000/api/otp/send-otp", {
        email: formData.email,
        role: "Employee",
      });
      setShowOTPVerification(true);
    } catch (err) {
      setError(err.response.data.message || "Failed to send OTP");
    }
  };

  const handleOTPVerificationSuccess = () => {
    setIsEmailVerified(true);
    setShowOTPVerification(false);
  };

  const handleCloseOTP = () => {
    setShowOTPVerification(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="employee-signup-form">
        <p style={{ textAlign: "center" }}>
          <b>Employee Signup :</b>
        </p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="soft-input"
          disabled={showOTPVerification} // Disable email field during OTP entry
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          required
          className="soft-input"
        />
        {isPasswordFocused && passwordMessage && (
          <p
            className={`password-message ${
              passwordMessage.includes("strong") ? "strong" : "weak"
            }`}
          >
            {passwordMessage}
          </p>
        )}
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
        {success && <p className="success">{success}</p>}
        <button
          type="button"
          onClick={handleVerify}
          className="soft-input"
          disabled={isVerifyDisabled}
        >
          Verify
        </button>
        <label className="soft-checkbox">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          I agree to the{" "}
          <span
            className="terms-link"
            onClick={toggleTermsModal}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Terms and Conditions
          </span>
        </label>
        {showTermsModal && (
          <div className="terms-modal">
            <div className="terms-content">
              <TermsAndConditions
                formData={formData}
                handleChange={handleChange}
              />
              <button
                onClick={toggleTermsModal}
                className="close-button"
                style={{ marginTop: "10px" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <button type="submit" className="soft-button">
          Sign Up
        </button>
      </form>
      {showOTPVerification && (
        <OTPVerification
          email={formData.email}
          role="Employee"
          onClose={handleCloseOTP}
          onSuccess={handleOTPVerificationSuccess}
        />
      )}
    </div>
  );
};
export default EmployeeSignup;
