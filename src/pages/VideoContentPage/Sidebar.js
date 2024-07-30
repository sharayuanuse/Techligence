import React from "react";

const Sidebar = ({ prerequisites }) => {
  return (
    <div className="sidebar w-1/4 pl-4">
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
        <ul className="list-disc pl-5">
          {prerequisites.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      {/* Additional Sidebar Content Can Be Added Here */}
    </div>
  );
};

export default Sidebar;
