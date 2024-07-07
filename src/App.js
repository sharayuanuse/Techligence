import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import Profile_Interface from "./pages/Profile_Interface";
import Home from "./pages/Home";
import Community from "./pages/Community";
import AdminListPage from "./pages/AdminListPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

function App() {
  // Simulate a logged-in user with admin role
  const mockUser = {
    email: "admin@example.com",
    role: "Admin",
  };

  return (
    <AuthProvider>
      <UserProvider user={mockUser}> {/* Pass mockUser as user */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile_Interface />} />
          <Route path="/courses" element={<CourseCatalogPage />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/admin/list"
            element={
              <ProtectedRoute>
                <AdminListPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
