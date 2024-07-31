import React, { useState } from "react";
import "./AddCourseModal.css";
import axios from "axios";
import { storage } from "../../utils/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddCourseModal = ({ isOpen, onClose, handleAddCourse, fetchCourses }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    popularity: "",
    thumbnail: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        setErrorMessage(
          <>
            File size exceeds 1 MB. Please{" "}
            <a
              href="https://www.iloveimg.com/compress-image"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              compress
            </a>{" "}
            the image or choose a smaller file.
          </>
        );
        return;
      }

      setIsUploading(true);
      setErrorMessage(""); // Clear any previous error message
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      await uploadBytes(imageRef, file);
      const url = await getImageDownloadURL(imageRef);
      setFormData({
        ...formData,
        thumbnail: url,
      });
      setIsUploading(false);
    }
  };

  const getImageDownloadURL = async (imageRef) => {
    return await getDownloadURL(imageRef);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addCourse = async (formData) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/institute/courses/teacher",
          formData
        );
        console.log(res.data);
        fetchCourses();
      } catch (error) {
        console.log(error.message);
      }
    };
    addCourse(formData);
    handleAddCourse(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative z-10">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          style={{ width: "2em" }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          {/* Title field */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="course-soft-input"
          />

          {/* Description field */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="course-soft-input"
          />

          {/* Category field */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="course-soft-input"
          />

          {/* Difficulty dropdown */}
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="course-soft-input"
          >
            <option value="" disabled>
              Select Difficulty
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Popularity */}
          <input
            type="number"
            name="popularity"
            step="0.1"
            max="5"
            min="0"
            placeholder="Popularity"
            value={formData.popularity}
            onChange={handleChange}
            required
            className="course-soft-input"
          />

          {/* Thumbnail upload field */}
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="course-soft-input"
            accept="image/*"
          />

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="course-soft-button"
            disabled={isUploading}
          >
            {isUploading ? "Uploading Thumbnail" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
