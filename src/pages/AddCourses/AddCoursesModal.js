import React, { useState } from "react";
import "./AddCourseModal.css";

const AddCourseModal = ({ isOpen, onClose, addCourse }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    popularity: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        thumbnail: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backdropFilter: "blur(5px)" }}>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative z-10">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose} style={{width:'2em'}}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="course-soft-input" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="course-soft-input" />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="course-soft-input" />
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} required className="course-soft-input">
            <option value="" disabled>Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input type="number" name="popularity" step='0.1' max='5' min='0' placeholder="Popularity" value={formData.popularity} onChange={handleChange} required className="course-soft-input" />
          <input type="file" name="thumbnail" onChange={handleFileChange} required className="course-soft-input" accept="image/*"/>
          <button type="submit" className="course-soft-button">Add Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
