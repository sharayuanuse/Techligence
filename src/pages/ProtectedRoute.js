import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user || user.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
