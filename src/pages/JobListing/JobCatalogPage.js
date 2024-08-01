import React, { useState, useEffect, useRef } from "react";
import addJobsButton from "../../add-courses-button.svg";
import Homepage from "../Homepage";
import axios from "axios";
import AddJobModal from "./AddJobModal.js";
import JobDetailsModal from "./JobDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { selectState } from "../Redux/ReduxSlices.js";
import { selectJobId, setJobId } from "../Redux/JobSlice.js";
import JobCard from "./JobCard";
import './JobCard.css'; 
import { dummyJobs } from './dummyJobs';

const JobCatalogPage = () => {
  const [jobs, setJobs] = useState(dummyJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const filterRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/company/jobs");
        if (res.data.jobs && res.data.jobs.length > 0) {
          setJobs(res.data.jobs);
        } else {
          setJobs(dummyJobs);
        }
      } catch (error) {
        console.log(error);
        setJobs(dummyJobs);
      }
    };
    fetchJobs();
    console.log("jobs fetched");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const user = useSelector(selectState);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsAddJobModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddJobModalOpen(false);
  };

  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  const handleJobDetailsClose = () => {
    setIsJobDetailsModalOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedLocation("");
    setSelectedDuration("");
    setSortBy("");
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || job.type === selectedType) &&
      (selectedLocation === "" || job.location === selectedLocation) &&
      (selectedDuration === "" || job.duration === selectedDuration)
    );
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "salary") {
      return (
        parseInt(a.salary.split(" - ")[0].replace(/[^0-9]/g, "")) -
        parseInt(b.salary.split(" - ")[0].replace(/[^0-9]/g, ""))
      );
    } else if (sortBy === "salary_high_to_low") {
      return (
        parseInt(b.salary.split(" - ")[0].replace(/[^0-9]/g, "")) -
        parseInt(a.salary.split(" - ")[0].replace(/[^0-9]/g, ""))
      );
    } else {
      return 0;
    }
  });

  return (
    <Homepage>
      <div className="jobs-page-container">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-4/5 px-6 py-2.5 mb-4 border border-red-900 rounded-md focus:outline-none focus:border-blue-500 shadow-md transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="relative">
            <div style={{ display: "flex" }}>
              {user && user.role.toLowerCase() === "manager" && (
                <button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    textWrap: "nowrap",
                  }}
                  className="px-10 py-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-md transition-all duration-200"
                  onClick={handleOpenModal}
                >
                  <img src={addJobsButton} alt="Add Jobs" />
                  Add Jobs
                </button>
              )}
              <button
                className="px-10 py-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-md transition-all duration-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter
              </button>
            </div>
            {showFilters && (
              <div ref={filterRef} className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-64 z-10">
                <select
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <select
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="in-office">In-office</option>
                  <option value="remote">Remote</option>
                </select>
                <select
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="">All Durations</option>
                  <option value="1 year">1 year</option>
                  <option value="6 months">6 months</option>
                  <option value="3 months">3 months</option>
                </select>
                <select
                  className="w-full px-4 py-3 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="salary">Salary (Low to High)</option>
                  <option value="salary_high_to_low">Salary (High to Low)</option>
                </select>
                <button
                  className="clear-filters-button"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-8">
          {sortedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              logo={job.logo}
              type={job.type}
              experience={job.experience}
              location={job.location}
              postedOn={job.postedOn}
              job_link={job.job_link}
              onApply={() => handleApplyClick(job)}
            />
          ))}
        </div>
      </div>
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={handleCloseModal}
        handleAddJob={handleAddJob}
      />
      {isJobDetailsModalOpen && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={handleJobDetailsClose}
        />
      )}
    </Homepage>
  );
};

export default JobCatalogPage;
