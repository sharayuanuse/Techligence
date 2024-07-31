import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./avatar.png";
import SignupModal from "../pages/SignUpPage/SignupModal";
import { useSelector } from "react-redux";
import { selectState } from "../pages/Redux/ReduxSlices";
import NotificationIcon from "./notifications-icon.svg";
import CalendarIcon from "./calendar.svg";
import Calendar from "../pages/CalendarComponent/Calendar.js";

const Header = () => {
  const user = useSelector(selectState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleCalendar = () => setIsCalendarOpen((prev) => !prev);

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                to="/jobs"
                className="text-white hover:text-gray-200 text-sm md:text-base"
              >
                Jobs
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
                {/* notification */}
                <div className="relative">
                  <img
                    title="notifications"
                    src={NotificationIcon}
                    alt="Notifications"
                    onClick={toggleDropdown}
                    className="cursor-pointer"
                  />
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-full right-0 translate-x-1/3 z-2 mt-2 w-48 backdrop-blur-2xl text-black shadow-lg rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <p className="font-semibold mb-2">Notifications</p>
                        {/* Conditionally render notifications */}
                        {user ? (
                          <div>
                            <div className="py-2 border-b border-gray-200">
                              <p className="text-sm">
                                You have an upcoming deadline for your
                                submission
                              </p>
                            </div>
                            <div className="py-2 border-b border-gray-200">
                              <p className="text-sm">
                                Your course was updated.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">
                            Login or sign up to receive notifications
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* calendar */}
                <div className="relative">
                  <img
                    title="calendar"
                    src={CalendarIcon}
                    alt="Calendar"
                    onClick={toggleCalendar}
                    className="cursor-pointer"
                  />
                  {isCalendarOpen && (
                    <div
                      ref={calendarRef}
                      className="absolute top-full right-0 translate-x-10 z-2 mt-3 w-max border border-grey min-w-96 h-max backdrop-blur-2xl text-black shadow-lg rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        {user ? (
                          <Calendar user={user} />
                        ) : (
                          <p className="text-sm">
                            Login or sign up to access your calendar
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>  
                {/* User Photo */}
                <div
                  className="text-white hover:text-gray-200 cursor-pointer"
                  onClick={openModal}
                >
                  <div className="relative">
                    <img
                      title={
                        user !== null
                          ? `${user.email}, ${user.role}`
                          : "Signup / Login"
                      }
                      src={ProfileIcon}
                      alt="User"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      draggable="false"
                      style={{ userSelect: "none" }}
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