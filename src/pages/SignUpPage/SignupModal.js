import React, { useState } from "react";
import "./SignUpModel.css";
import InstituteRoleSelection from "./RoleSelection/InstituteRoleSelection";
import StudentSignup from "./InstituteForm/Student";
import backButton from "./back-button.svg";
import TeacherSignup from "./InstituteForm/TeacherForm";
import AdminSignup from "./InstituteForm/AdminForm";
import EmployeeSignup from "./CompanyForm/Employee";
import ManagerSignup from "./CompanyForm/Manager";
import VCRoleSelection from "./RoleSelection/VCRoleSelection";
import UserSignup from "./VC/User";
import CompanyRoleSelection from "./RoleSelection/CompanyRoleSelection";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { selectState } from "../Redux/ReduxSlices";
import Separator from "../../utils/Seperator/Seperator";

const SignupModal = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loginRequested, setLoginRequested] = useState(false);
  const [subRole, setSubRole] = useState(null);
  const user = useSelector(selectState)

  const toggleLogin = () => {
    setLoginRequested(!loginRequested);
  };

  const toggleActiveButton = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setSubRole(null); // Reset sub-role when changing main role
      setLoginRequested(false); // Reset login request when changing main role
    }
  };

  const handleBackClick = () => {
    setSubRole(null);
    setLoginRequested(false); // Reset login request when going back
  };

  if (!isOpen) return null;
  if(user) return null;

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
              style={{ position: "absolute", padding: "0" }}
              title="Back"
            >
              <img src={backButton} draggable="false" />
            </button>
          )}

          {!loginRequested ? (
            <>
              {activeIndex === 0 && !subRole && (
                <InstituteRoleSelection setSubRole={setSubRole} />
              )}
              {activeIndex === 0 && subRole === "Student" && <StudentSignup />}
              {activeIndex === 0 && subRole === "Teacher" && <TeacherSignup />}
              {activeIndex === 0 && subRole === "Admin" && <AdminSignup organization={'institute'} />}
              {/* Add other forms for other sub-roles*/}

              {activeIndex === 1 && !subRole && (
                <CompanyRoleSelection setSubRole={setSubRole} />
              )}
              {activeIndex === 1 && subRole === "Employee" && (
                <EmployeeSignup />
              )}
              {activeIndex === 1 && subRole === "Manager" && <ManagerSignup />}
              {activeIndex === 1 && subRole === "Admin" && <AdminSignup organization={'company'} />}

              {activeIndex === 2 && !subRole && (
                <VCRoleSelection setSubRole={setSubRole} />
              )}
              {activeIndex === 2 && subRole === "User" && <UserSignup />}
              {activeIndex === 2 && subRole === "Admin" && <AdminSignup organization={'vc'} />}
            </>
          ) : (
            <LoginForm />
          )}

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
