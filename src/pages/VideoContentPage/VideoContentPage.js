import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import VideoPlayer from "./VideoPlayer";
import CourseDetails from "./CourseDetails";
import LectureList from "./LectureList";
import CommentsSection from "./CommentsSection";
import { selectCourseId } from "../Redux/CourseSlice";

const courses = {
  title: "Complete React Course: From Beginner to Advanced",
  description: "Learn React from scratch to advanced concepts.",
  instructor: {
    name: "John Doe",
    title: "Senior Software Engineer",
    profilePicture: "https://via.placeholder.com/150",
  },
  lectures: [
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
  ],
};

const VideoContentPage = () => {
  const selectedCourseId = useSelector(selectCourseId);
  const [course, setCourse] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (selectedCourseId) {
      const fetchCourseDetails = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/institute/courses/teacher`
          );
          const courses = res.data.courses;
          const getCourseById = courses.find(
            (course) => course._id === selectedCourseId
          );
          setCourse(getCourseById);
        } catch (error) {
          console.error("Failed to fetch course details:", error);
        }
      };
      fetchCourseDetails();
    }
  }, [selectedCourseId]);

  const handleVideoUrlUpdate = (url) => {
    setVideoUrl(url);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex w-full">
          <div className="w-full pr-4">
            <div className="flex flex-row w-full">
              {/* Video Player */}
              <div className="w-full">
                <VideoPlayer videoUrl={videoUrl} />

                {/* Course Details */}
                <div className="w-full">
                  <CourseDetails course={course} />
                </div>
              </div>

              {/* Lecture List */}
              <div className="w-6/12 ml-2">
                <LectureList lectures={courses.lectures} onVideoUrlUpdate={handleVideoUrlUpdate} />
              </div>
            </div>

            {/* Comments Section */}
            <div className="w-full">
              <CommentsSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoContentPage;
