import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

function Homepage({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
      <Header />
      {/* Main Content */}
      <main className="flex-grow">
        <div>
          <div className="text-center">{children}</div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Course Website. All rights reserved.</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}

export default Homepage;
