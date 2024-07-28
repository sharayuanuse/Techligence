import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OTPVerification.css";

const OTPVerification = ({ email, role, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    const otpValidity = setTimeout(() => {
      setMessage("OTP has expired. Please click 'Resend OTP' to get a new OTP.");
    }, 15 * 60 * 1000); // OTP valid for 15 minutes

    return () => clearTimeout(otpValidity);
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else {
        document.getElementById(`otp-verify-button`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:8000/api/otp/verify-otp", {
        email,
        otp: otp.join(""),
      });
      setMessage("OTP verified successfully");
      onSuccess(); // Call onSuccess prop to handle post-verification behavior
    } catch (err) {
      setMessage(err.response.data.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:8000/api/otp/send-otp", { email, role });
      setMessage("OTP sent successfully");
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setMessage(err.response.data.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="otp-verification-overlay">
      <div className="otp-verification-container">
        <div className="otp-verification-form">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={onClose}
            style={{ width: "2em" }}
          >
            &times;
          </button>
          <h3>OTP Verification</h3>
          <div className="otp-inputs-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <div className="otp-buttons-container">
            <button
              id="otp-verify-button"
              onClick={handleVerify}
              disabled={otp.includes("")}
              className={`soft-button ${otp.includes("") ? 'otp-inactive-button' : 'enter-otp'}`}
            >
              Enter
            </button>
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`soft-button ${!canResend ? 'otp-inactive-button' : 'resend-otp'}`}
            >
              Resend OTP
            </button>
          </div>
          <p>{message}</p>
          <p>Did not receive OTP? Resend in {timer} sec</p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
