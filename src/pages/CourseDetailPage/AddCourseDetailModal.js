import React, { useState } from "react";
import "./AddCourseDetailModal.css";
import axios from "axios";

const AddCourseDetailsModal = ({ isOpen, onClose, handleAddCourseDetails }) => {
  const [formData, setFormData] = useState({
    learnings: [],
    prerequisites: [],
    chapters: [],
    duration: "",
    creator: "",
  });

  const [currentLearning, setCurrentLearning] = useState("");
  const [currentPrerequisite, setCurrentPrerequisite] = useState("");
  const [currentChapter, setCurrentChapter] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLearningChange = (e) => {
    setCurrentLearning(e.target.value);
  };

  const handlePrerequisiteChange = (e) => {
    setCurrentPrerequisite(e.target.value);
  };

  const handleChapterChange = (e) => {
    setCurrentChapter(e.target.value);
  };

  const handleLearningKeyPress = (e) => {
    if (e.key === "Enter" && currentLearning.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        learnings: [...formData.learnings, currentLearning],
      });
      setCurrentLearning("");
    }
  };

  const handlePrerequisiteKeyPress = (e) => {
    if (e.key === "Enter" && currentPrerequisite.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        prerequisites: [...formData.prerequisites, currentPrerequisite],
      });
      setCurrentPrerequisite("");
    }
  };

  const handleChapterKeyPress = (e) => {
    if (e.key === "Enter" && currentChapter.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        chapters: [...formData.chapters, currentChapter],
      });
      setCurrentChapter("");
    }
  };

  const removeLearning = (index) => {
    setFormData({
      ...formData,
      learnings: formData.learnings.filter((_, i) => i !== index),
    });
  };

  const removePrerequisite = (index) => {
    setFormData({
      ...formData,
      prerequisites: formData.prerequisites.filter((_, i) => i !== index),
    });
  };

  const removeChapter = (index) => {
    setFormData({
      ...formData,
      chapters: formData.chapters.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming this is the endpoint to save course details
      const res = await axios.post(
        "http://localhost:8000/api/institute/courses/details",
        formData
      );
      console.log(res.data);
      // Optionally handleAddCourseDetails can be called here
      handleAddCourseDetails(formData);
    } catch (error) {
      console.log(error.message);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative z-10 overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          style={{ width: "2em" }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add Course Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Chapters Section */}

          <div className="mb-4">
            <label
              htmlFor="chapters"
              className="block text-gray-700 font-semibold mb-2"
            >
              Enter The Chapter Names Of The Course
            </label>
            <input
              type="text"
              id="chapters"
              name="chapters"
              placeholder="Enter a Chapter Name and press Enter"
              value={currentChapter}
              onChange={handleChapterChange}
              onKeyPress={handleChapterKeyPress}
              className="course-soft-input"
            />
            <ul className="mt-2">
              {formData.chapters.map((chapter, index) => (
                <li
                  key={index}
                  className="list-disc ml-4 text-gray-600 flex items-center justify-between"
                >
                  {chapter}
                  <button
                    type="button"
                    onClick={() => removeChapter(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* What Will You Learn Sectionn */}
          <div className="mb-4">
            <label
              htmlFor="learnings"
              className="block text-gray-700 font-semibold mb-2"
            >
              What will the student learn?
            </label>
            <input
              type="text"
              id="learnings"
              name="learnings"
              placeholder="Enter a learning point and press Enter"
              value={currentLearning}
              onChange={handleLearningChange}
              onKeyPress={handleLearningKeyPress}
              className="course-soft-input"
            />
            <ul className="mt-2">
              {formData.learnings.map((learning, index) => (
                <li
                  key={index}
                  className="list-disc ml-4 text-gray-600 flex items-center justify-between"
                >
                  {learning}
                  <button
                    type="button"
                    onClick={() => removeLearning(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Pre-requisites section */}
          <div className="mb-4">
            <label
              htmlFor="prerequisites"
              className="block text-gray-700 font-semibold mb-2"
            >
              What are the prerequisites?
            </label>
            <input
              type="text"
              id="prerequisites"
              name="prerequisites"
              placeholder="Enter a prerequisite and press Enter"
              value={currentPrerequisite}
              onChange={handlePrerequisiteChange}
              onKeyPress={handlePrerequisiteKeyPress}
              className="course-soft-input"
            />
            <ul className="mt-2">
              {formData.prerequisites.map((prerequisite, index) => (
                <li
                  key={index}
                  className="list-disc ml-4 text-gray-600 flex items-center justify-between"
                >
                  {prerequisite}
                  <button
                    type="button"
                    onClick={() => removePrerequisite(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* duration of Course Section */}

          <label
            htmlFor="duration"
            className="block text-gray-700 font-semibold mb-2"
          >
            Total Duration of Course :{" "}
          </label>
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 4 weeks, 30 hours)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="course-soft-input mb-5"
          />

          {/* creator section */}

          <label
            htmlFor="creator"
            className="block text-gray-700 font-semibold mb-2"
          >
            Creator of Course :{" "}
          </label>
          <input
            type="text"
            name="creator"
            placeholder="Name of Creator Of Course"
            value={formData.creator}
            onChange={handleChange}
            required
            className="course-soft-input mb-5"
          />

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button type="submit" className="course-soft-button">
              Add Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseDetailsModal;
