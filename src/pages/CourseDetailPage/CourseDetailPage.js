import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectState } from "../Redux/ReduxSlices";
import { selectCourseId } from "../Redux/CourseSlice";
import AddCourseDetailsModal from "./AddCourseDetailModal";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import "./AddCourseDetailModal.css";

import FavoriteIcon from "./favorite-icon.svg";
import DropDownIcon from "./DropDown-Icon.svg";
import TickIcon from "./tick-icon.svg";

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);
  const user = useSelector(selectState);
  const getSelectedCourse = useSelector(selectCourseId);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [expandedPrerequisites, setExpandedPrerequisites] = useState({});

  // Dummy array for course contents
  const courseContents = [
    {
      chapterTitle: "Introduction",
      sections: ["Welcome", "Course Overview", "How to Use This Course"],
    },
    {
      chapterTitle: "Getting Started",
      sections: [
        "Setting Up Your Environment",
        "Basic Concepts",
        "Hello World",
      ],
    },
    {
      chapterTitle: "Advanced Topics",
      sections: ["State Management", "Routing", "Performance Optimization"],
    },
    {
      chapterTitle: "Final Project",
      sections: [
        "Project Overview",
        "Building the Project",
        "Deploying the Project",
      ],
    },
  ];

  // Dummy array for what students will learn
  const whatYouWillLearn = [
    "Understand the fundamentals of React",
    "Build and deploy a real-world application",
    "Learn advanced state management",
    "Master React hooks and context API",
    "Optimize React applications for performance",
    "Implement routing with React Router",
    "Deploy applications to production",
  ];

  // Dummy array for prerequisites
  const prerequisites = [
    {
      title: "Programming Basics",
      details: [
        "Understanding of variables and data types",
        "Basic control structures (loops, conditionals)",
        "Functions and procedures",
      ],
    },
    {
      title: "Web Development Fundamentals",
      details: [
        "HTML and CSS basics",
        "Introduction to JavaScript",
        "Understanding of client-server architecture",
      ],
    },
    // Add more prerequisites as needed
  ];

  // Dummy data for creator
  const creator = {
    name: "John Doe",
    title: "Senior Software Engineer",
    profilePicture: "https://via.placeholder.com/150",
    bio: "John has over 10 years of experience in software development and has worked with numerous technologies. He is passionate about teaching and sharing his knowledge with others.",
    courses: [
      {
        title: "Advanced React",
        thumbnail: "https://via.placeholder.com/100",
      },
      {
        title: "JavaScript Mastery",
        thumbnail: "https://via.placeholder.com/100",
      },
    ],
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/institute/courses/teacher"
        );
        const courses = res.data.courses;
        // filtering the course based on the ID
        const getCourseById = courses.find(
          (course) => course._id === getSelectedCourse
        );
        setCourse(getCourseById);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [getSelectedCourse]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleAddCourseDetailsClick = () => {
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleAddCourseDetails = (newDetails) => {
    console.log("New course details added:", newDetails);
  };

  const toggleChapter = (index) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const togglePrerequisite = (index) => {
    setExpandedPrerequisites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-3">{course.title}</h1>
            {user && user.role.toLowerCase() === "teacher" && (
              <button
                className="soft-button flex justify-self-end mb-3"
                onClick={handleAddCourseDetailsClick}
              >
                Add Course Details
              </button>
            )}
            <p className="text-gray-600 mb-5">
              Course Description : <br /> {course.description}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Popularity: {course.popularity}</p>
              <p className="text-gray-500">Category: {course.category}</p>
              <p className="text-gray-500">Difficulty: {course.difficulty}</p>
              <p className="text-gray-500">
                No. Of Students Enrolled To This Course :{" "}
                {course.students_enrolled}
              </p>
            </div>
            <div className="flex"> 
              <button className="soft-button-course-details">
                Enroll For the Course
              </button>
              <img src={FavoriteIcon} className="ml-5"/>
            </div>
          </div>
        </div>
        <AddCourseDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          handleAddCourseDetails={handleAddCourseDetails}
        />
      </div>
      {/* Course content and whhat you will learn section */}
      <div className="container mx-auto px-4 py-8 flex">
        <div className="flex flex-row mb-3">
          {/* Course Contentssection */}
          <div className="bg-white shadow-md rounded-md p-4 w-6/12 mr-4">
            <h2 className="text-3xl font-bold mb-4">Course Contents</h2>
            {courseContents.map((chapter, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex items-center cursor-pointer border border-black rounded p-2.5"
                  onClick={() => toggleChapter(index)}
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {chapter.chapterTitle}
                  </h3>
                  <img src={DropDownIcon} className="ml-2" />
                </div>
                <div
                  className={`collapsible-content ${
                    expandedChapters[index] ? "expanded" : ""
                  } border rounded`}
                >
                  <ul className="pl-4">
                    {chapter.sections.map((section, secIndex) => (
                      <li
                        key={secIndex}
                        className="text-gray-700 border border-gray p-3.5 m-1 rounded"
                      >
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* What You Will Learn section*/}
          <div className="bg-white shadow-md rounded-md p-4 w-6/12">
            <h2 className="text-3xl font-bold mb-4">What You Will Learn</h2>
            <div className="scrollable-list border-3 rounded">
              <div className="grid-item">
                {whatYouWillLearn.map((item, index) => (
                  <div
                    key={index}
                    className="text-gray-700 border border-gray p-3.5 m-1 rounded flex"
                  >
                    <img src={TickIcon} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Prerequisites Section */}
        <div className="bg-white shadow-md rounded-md p-4 w-full">
          <h2 className="text-3xl font-bold mb-4">Prerequisites</h2>
          {prerequisites.map((prerequisite, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex items-center cursor-pointer border border-black rounded p-2.5"
                onClick={() => togglePrerequisite(index)}
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {prerequisite.title}
                </h3>
                <img src={DropDownIcon} className="ml-2" />
              </div>
              <div
                className={`collapsible-content ${
                  expandedPrerequisites[index] ? "expanded" : ""
                } border rounded`}
              >
                <ul className="pl-4">
                  {prerequisite.details.map((detail, secIndex) => (
                    <li
                      key={secIndex}
                      className="text-gray-700 border border-gray p-3.5 m-1 rounded"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      {/* Creator Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-3xl font-bold mb-4">Course Creator</h2>
          <div className="flex items-center mb-4">
            <div>
              <h3 className="text-2xl font-semibold">{creator.name}</h3>
              <p className="text-gray-600">{creator.title}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{creator.bio}</p>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default CourseDetailPage;
