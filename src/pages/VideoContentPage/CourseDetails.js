import React from "react";

const CourseDetails = ({ course }) => {
  return (
    <div className="course-details bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-2xl font-semibold">{course.title}</h2>
      <p className="text-gray-600 mb-2">{course.description}</p>
      <div className="instructor flex items-center mb-3">
        <img
          src={"https://via.placeholder.com/150"}
          // alt={course.instructor.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          {/* <h3 className="text-lg font-semibold">{course.instructorName}</h3> */}
          <h3 className="text-lg font-semibold">course instructor name</h3>
          {/* <p className="text-gray-600"> {course.instructorTitle}</p> */}
          <p className="text-gray-600"> course instructor title</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
