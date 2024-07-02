import React, { useState } from "react";
import Separator from "../Seperator/Seperator";
import "./SignUpModel.css";
import InstituteRoleSelection from "./RoleSelection/InstituteRoleSelection";
import StudentSignup from "./InstituteForm/Student";
import backButton from "./back-button.svg";
import TeacherSignup from "./InstituteForm/TeacherForm";
import AdminSignup from "./InstituteForm/AdminForm";

const SignupModal = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loginRequested, setLoginRequested] = useState(false);
  const [subRole, setSubRole] = useState(null);

  const toggleLogin = () => {
    setLoginRequested(!loginRequested);
  };

  const toggleActiveButton = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setSubRole(null); // Reset sub-role when changing main role
    }
  };

  const handleBackClick = () => {
    setSubRole(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backdropFilter: "blur(5px)",
        transition: "backdrop-filter 0.3s ease-out",
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative z-10">
        {/* close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          style={{ width: "2em" }}
        >
          &times;
        </button>
        <div className="roles">
          <button
            className={`soft-button ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => toggleActiveButton(0)}
          >
            Institute
          </button>
          <button
            className={`soft-button ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => toggleActiveButton(1)}
          >
            Company
          </button>
          <button
            className={`soft-button ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => toggleActiveButton(2)}
          >
            VC
          </button>
        </div>
        <Separator />
        <div className="container">
          {subRole && (
            <button
              className="soft-button back-button"
              onClick={handleBackClick}
              style={{position:'absolute', padding:'0'}}
              title="Back"
            >
              <img src={backButton} draggable="false"/>
            </button>
          )}
          {activeIndex === 0 && !subRole && (
            <InstituteRoleSelection setSubRole={setSubRole} />
          )}
          {activeIndex === 0 && subRole === "Student" && <StudentSignup />}
          {activeIndex === 0 && subRole === "Teacher" && <TeacherSignup />}
          {activeIndex === 0 && subRole === "Admin" && <AdminSignup />}
          {/* Add other forms for other sub-roles*/}
          {subRole && (
            <p
              style={{
                textAlign: "center",
                marginTop: "1rem",
                cursor: "pointer",
              }}
              onClick={toggleLogin}
            >
              {!loginRequested
                ? "Already Have an Account? "
                : "Don't Have an Account? "}
              <u>{!loginRequested ? "Log In" : "Sign Up"}</u>
            </p>
          )}
        </div>
        <div className="mb-4"></div>
      </div>
    </div>
  );
};

export default SignupModal;
