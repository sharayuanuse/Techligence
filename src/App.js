import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import Profile_Interface from "./pages/Profile_Interface";
import Home from "./pages/Home";
import Community from "./pages/Community";
import AdminListPage from "./pages/AdminListPage";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import ProtectedRoute from "./pages/ProtectedRoute";
// import { AuthProvider } from "./context/AuthContext";
// import { UserProvider } from "./context/UserContext";
import { selectState } from "./pages/Redux/ReduxSlices";
import { useSelector } from "react-redux";

function App() {
  // Simulate a logged-in user with admin role
  
  const user = useSelector(selectState)

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={
              <ProtectedRoute >
                <Profile_Interface />
              </ProtectedRoute>
            } />
          <Route path="/courses" element={
              <ProtectedRoute>
                <CourseCatalogPage />
              </ProtectedRoute>
            } />
          <Route path="/community" element={<Community />} />
          <Route
            path="/admin/list"
            element={
              <ProtectedRouteAdmin>
                <AdminListPage />
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
    </>
  );
}

export default App;
