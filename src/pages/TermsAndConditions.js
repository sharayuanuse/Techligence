import React, { useState } from "react";
import "./TermsAndConditions.css"; // Ensure to style this according to your needs

const TermsAndConditions = ({ formData, handleChange }) => {

  return (
    <div className="terms-content">
      <h1 className="heading">
        <strong>Terms and Conditions </strong>
      </h1>
      <div className="terms-list">
        <p style={{ textAlign: "justify" }}>
          <b>Information Collection:</b> We collect personal information, such as names, email addresses, and payment details, to provide and improve our services. This information is collected directly from users or automatically through the use of cookies and similar technologies.
        </p>
        <p style={{ textAlign: "justify" }}>
          <b>Use of Information:</b> The information collected is used to operate and maintain our services, communicate with users, process transactions, and personalize the user experience. We may also use this information to send promotional emails or newsletters with user consent.
        </p>
        <p style={{ textAlign: "justify" }}>
          <b>Sharing of Information:</b> We may share personal information with third-party service providers who assist us in delivering our services. These providers are contractually obligated to use the information only for the purposes specified by us and to protect its confidentiality.
        </p>
        <p style={{ textAlign: "justify" }}>
          <b>Data Security:</b> We take reasonable measures to protect the confidentiality and security of personal information collected through our services. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </p>
        <p style={{ textAlign: "justify" }}>
          <b>User Choices and Rights:</b> Users have the right to access, correct, or delete their personal information. They can also choose to opt out of receiving certain communications or withdraw consent for the use of their information. Instructions for exercising these rights are provided in our Privacy Policy.
        </p>
      </div>
                  
    </div>
  );
};

export default TermsAndConditions;
