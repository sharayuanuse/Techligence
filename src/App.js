import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import Profile_Interface from "./pages/Profile_Interface";
import Home from "./pages/Home";
import Community from "./pages/Community";
import AdminListPage from "./pages/AdminListPage";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import ProtectedRoute from "./pages/ProtectedRoute";
import { selectState } from "./pages/Redux/ReduxSlices";
import { useSelector } from "react-redux";
import CourseDetailPage from "./pages/CourseDetailPage/CourseDetailPage";
import JobCatalogPage from "./pages/JobListing/JobCatalogPage"; 

function App() {
  const user = useSelector(selectState);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courseDetailPage" element={<CourseDetailPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile_Interface />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseCatalogPage />
            </ProtectedRoute>
          }
        />
        <Route path="/community" element={<Community />} />
        <Route
          path="/admin/list"
          element={
            <ProtectedRouteAdmin>
              <AdminListPage />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/jobs"
          element={
              <JobCatalogPage />
          }
        />
      </Routes>
    </>
  );
}

export default App;
