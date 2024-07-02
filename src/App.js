import React from "react";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import { Routes, Route } from "react-router-dom";
import Profile_Interface from "./pages/Profile_Interface";
import Homepage from "./pages/Homepage";
import Home from "./pages/Home";
import Community from "./pages/Community";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile_Interface />} />
      <Route path="/courses" element={<CourseCatalogPage />} />
      <Route path="/community" element={<Community />} />
    </Routes>
    // <Header />
  );
}

export default App;
