import React from "react";
import "./InstituteRoleSelection.css";

const InstituteRoleSelection = ({ setSubRole }) => {
  return (
    <div className="container">
      <p style={{ textAlign: "center" }}>Select Role To Sign Up With : </p>
      <div className="button-container">
        <button className="sub-role-buttons" onClick={() => setSubRole("Student")}>Student</button>
        <button className="sub-role-buttons" onClick={() => setSubRole("Teacher")}>Teacher</button>
        <button className="sub-role-buttons" onClick={() => setSubRole("Admin")}>Admin</button>
      </div>
    </div>
  );
};

export default InstituteRoleSelection;
