import React, { useState, useEffect } from "react";
import addJobsButton from "../../add-courses-button.svg";
import Homepage from "../Homepage";
import axios from "axios";
import AddJobModal from "./AddJobModal.js";
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
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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

  const user = useSelector(selectState);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const selectedJobId = useSelector(selectJobId);
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

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || job.type === selectedType)
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
                  onClick={() => setIsAddJobModalOpen(true)}
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
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-64 z-10">
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
                  className="w-full px-4 py-3 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="salary">Salary (Low to High)</option>
                  <option value="salary_high_to_low">Salary (High to Low)</option>
                </select>
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
              logo={job.companyLogo} // Make sure to provide this in the job data
              type={job.type}
              experience={job.experience}
              location={job.location}
              postedOn={job.postedOn}
              job_link={job.job_link}
            />
          ))}
        </div>
      </div>
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={() => setIsAddJobModalOpen(false)}
        handleAddJob={handleAddJob}
      />
    </Homepage>
  );
};

export default JobCatalogPage;
