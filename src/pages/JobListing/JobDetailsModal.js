import React from 'react';
import Modal from 'react-modal';
import './JobDetailsModal.css';

const JobDetailsModal = ({ job, onClose }) => {
  const formatList = (text) => {
    return text
      .split('\n')
      .filter(line => line.trim() !== '')  // Remove any empty lines
      .map((line, index) => <li key={index}>{line}</li>);
  };

  return (
    <Modal
      isOpen={!!job}
      onRequestClose={onClose}
      contentLabel="Job Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <img src={job.logo} alt={job.company} className="company-logo" />
          <h3>{job.company}</h3>
          <hr />
          <h2>{job.title}</h2>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Duration:</strong> {job.duration}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Qualifications:</strong></p>
          <ul className="job-details-list">
            {formatList(job.qualification)}
          </ul>
          <p><strong>Responsibilities:</strong></p>
          <ul className="job-details-list">
            {formatList(job.responsibility)}
          </ul>
          <p><strong>Courses Required:</strong></p>
          <ul className="job-details-list">
            {formatList(job.coursesRequired)}
          </ul>
          <p><strong>Work Mode:</strong> {job.workMode}</p>
          <p><strong>Skills:</strong></p>
          <div className="skills-list">
            {job.skills && job.skills.length > 0 ? (
              job.skills.map((skill, index) => (
                <div key={index} className="skill-box">
                  {skill}
                </div>
              ))
            ) : (
              <p>No skills required</p>
            )}
          </div>
          <form className="apply-form">
            <label>
              Upload Resume:
              <input type="file" name="resume" />
            </label>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;
