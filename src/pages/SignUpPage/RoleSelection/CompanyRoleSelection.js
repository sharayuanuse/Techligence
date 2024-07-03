import React from "react";
import "./InstituteRoleSelection.css";

const CompanyRoleSelection = ({ setSubRole }) => {
  return (
    <div className="container">
      <p style={{ textAlign: "center" }}>Select Role To Sign Up With : </p>
      <div className="button-container">
        <button className="sub-role-buttons" onClick={() => setSubRole("Employee")}>Employee</button>
        <button className="sub-role-buttons" onClick={() => setSubRole("Manager")}>Manager</button>
        <button className="sub-role-buttons" onClick={() => setSubRole("Admin")}>Admin</button>
      </div>
    </div>
  );
};

export default CompanyRoleSelection;
