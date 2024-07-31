import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import './AddJobModal.css'; // Import the CSS file

const AddJobModal = ({ isOpen, onClose, handleAddJob }) => {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    companyLogo: "",
    jobRole: "",
    qualification: "",
    responsibility: "",
    coursesRequired: "",
    jobType: "",
    workMode: "",
    duration: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setJobDetails({ ...jobDetails, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(jobDetails).forEach((key) => {
      formData.append(key, jobDetails[key]);
    });

    try {
      const res = await axios.post("http://localhost:8000/api/company/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleAddJob(res.data.job);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Job"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="modal-header">Add Job Opening</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={jobDetails.companyName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Company Logo</label>
            <input
              type="file"
              name="companyLogo"
              onChange={handleFileChange}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Job Role</label>
            <input
              type="text"
              name="jobRole"
              value={jobDetails.jobRole}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={jobDetails.duration}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Responsibility</label>
            <textarea
              name="responsibility"
              value={jobDetails.responsibility}
              onChange={handleChange}
              className="textarea-field"
              placeholder="Enter responsibilities, each on a new line"
              required
            />
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <textarea
              name="qualification"
              value={jobDetails.qualification}
              onChange={handleChange}
              className="textarea-field"
              placeholder="Enter qualifications, each on a new line"
              required
            />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <textarea
              name="skills"
              value={jobDetails.skills}
              onChange={handleChange}
              className="textarea-field"
              placeholder="Enter skills, each on a new line"
              required
            />
          </div>
          <div className="form-group">
            <label>Courses Required</label>
            <textarea
              name="coursesRequired"
              value={jobDetails.coursesRequired}
              onChange={handleChange}
              className="textarea-field"
              placeholder="Enter required courses, each on a new line"
              required
            />
          </div>
          <div className="form-group">
            <label>Type of Job</label>
            <select
              name="jobType"
              value={jobDetails.jobType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="form-group">
            <label>Work Mode</label>
            <select
              name="workMode"
              value={jobDetails.workMode}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select work mode</option>
              <option value="hybrid">Hybrid</option>
              <option value="in-office">In-office</option>
            </select>
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
          >
            Add Job
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddJobModal;
