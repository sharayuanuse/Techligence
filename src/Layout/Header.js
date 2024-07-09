import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./avatar.png";
import SignupModal from "../pages/SignUpPage/SignupModal";
import { useSelector } from "react-redux";
import { selectState } from "../pages/Redux/ReduxSlices";
// import { useUser } from "../context/UserContext"; // Adjust the path as necessary

const Header = () => {
  // Use the context to get user
  const user = useSelector(selectState)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-blue-500 text-white py-0">
      <nav className="bg-blue-500 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <div className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                Course Website
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/courses"
                className="text-white hover:text-gray-200 text-sm md:text-base"
              >
                Courses
              </Link>
              <Link
                to="/community"
                className="text-white hover:text-gray-200 text-sm md:text-base"
              >
                Community
              </Link>
              {user && user.role.toLowerCase() === "admin" && (
                <Link
                  to="/admin/list"
                  className="text-white hover:text-gray-200 text-sm md:text-base"
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center space-x-4">
                {/* User Photo */}
                <div
                  className="text-white hover:text-gray-200 cursor-pointer"
                  onClick={openModal}
                >
                  <div className="relative">
                    <img
                      title="Signup / Login"
                      src={ProfileIcon}
                      alt="User"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SignupModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;
