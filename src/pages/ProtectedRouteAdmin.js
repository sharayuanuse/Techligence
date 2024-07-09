import React from "react";
import { Navigate } from "react-router-dom";
// import { useUser } from "../context/UserContext"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import { selectState } from "./Redux/ReduxSlices";

const ProtectedRouteAdmin = ({ children }) => {
  const user = useSelector(selectState)

  if (!user || user.role.toLowerCase() !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteAdmin;
