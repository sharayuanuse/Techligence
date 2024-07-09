import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import "./AdminListPage.css"; // Import separate CSS file for styles
import axios from "axios";

const AdminListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get('http://localhost:8000/api/institute/students')
      setStudents(res.data.students)
    }
    const fetchTeachers = async () => {
      const res = await axios.get('http://localhost:8000/api/institute/teachers')
      setTeachers(res.data.teachers)
    }
    try {
      fetchStudents()
      fetchTeachers()
    } catch (error) {
      console.log(error);
    }
  } , [])

  const [showTables, setShowTables] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleTables = () => {
    setShowTables(!showTables);
  };

  const filteredData = selectedCategory === "students"
    ? students.filter(student => 
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teachers.filter(teacher => 
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="admin-list-container">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 admin-dashboard-title">List of users for Institute</h1>

        <div className="admin-list-selection">
          <div className="category-buttons">
            <button
              className={`category-button ${selectedCategory === "students" ? "active" : ""}`}
              onClick={() => handleCategoryChange("students")}
            >
              Students
            </button>
            <button
              className={`category-button ${selectedCategory === "teachers" ? "active" : ""}`}
              onClick={() => handleCategoryChange("teachers")}
            >
              Teachers
            </button>
          </div>
          <input
            type="text"
            className="admin-list-search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="toggle-button" onClick={toggleTables}>
            {showTables ? "Hide Tables ▲" : "Show Tables ▼"}
          </button>
        </div>

        {showTables && (
          <div className="admin-list-table">
            {filteredData.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table-header">Id</th>
                    <th className="admin-table-header">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td className="admin-table-data">{item._id}</td>
                      <td className="admin-table-data">{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="admin-table-message">
                No {selectedCategory === "students" ? "students" : "teachers"} found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListPage;
