import React from "react";
import Homepage from "./Homepage";

const UserProfile = () => {
  // Dummy data for user profile
  const user = {
    username: "Ashok_2003",
    name: "Ashok_Shekade",
    progress: "50%",
    age: 25,
    phone: "+919999999999",
    gender: "Male",
    school: "Veermata Jijabai Technological Institute",
    email: "vjti@gmail.com",
    address: "vjti hostel, matunga mumbai-400019",
    achievements: ["Achievement 1", "Achievement 2"],
    badges: [
      {
        id: 1,
        name: "Badge 1",
        imageUrl:
          "https://assets.leetcode.com/users/images/d3f69eeb-aff8-426a-be4e-dc0cc938e89b_1614652010.685347.png",
      },
      {
        id: 2,
        name: "Badge 2",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUSfmSBQ0CPWGzzCvjF45SpCLixaNYhzP9EGuHKivP-A&s",
      },
    ],
    currentCourses: [
      {
        id: 1,
        title: "React Basics",
        progress: "25%",
      },
      {
        id: 2,
        title: "JavaScript Fundamentals",
        progress: "75%",
      },
    ],
  };

  return (
    <Homepage>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="container mx-auto">
          {/* User Info */}
          <div className="flex flex-wrap mb-6">
            {/* Left Side */}
            <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-0">
              <div className="flex items-center mb-4 ml-3">
                <img
                  className="w-32 h-32 rounded-full mr-4 border-4 border-gray-300"
                  src="https://snworksceo.imgix.net/ame-egl/c73309fd-7d70-4338-8ad4-5c95ef88fd30.sized-1000x1000.jpg?w=1000"
                  alt="Profile"
                />
                <div>
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <p className="text-sm text-gray-490">{user.name}</p>
                  <p className="text-sm text-gray-490">
                    Progress: {user.progress}
                  </p>
                </div>
              </div>
              <div>
                <button
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 ml-5
            border border-blue-500 hover:border-transparent rounded"
                >
                  Edit Personal details
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full sm:w-1/2 md:w-2/3 mb-2  bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg  font-bold mb-4">Personal Details</h2>

              <div className="mb-4 flex space-x-4">
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">🎂 Age:</span>
                  <span>{user.age}</span>
                </p>
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">🏫 School:</span>
                  <span>{user.school}</span>
                </p>
              </div>
              <div className="mb-4 flex space-x-4">
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">🚻 Gender:</span>
                  <span>{user.gender}</span>
                </p>
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">📞 Phone:</span>
                  <span>{user.phone}</span>
                </p>
              </div>
              <div className="mb-4 flex space-x-4">
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">📧 Email:</span>
                  <span>{user.email}</span>
                </p>
                <p className="text-sm flex items-center bg-gray-100 rounded-md px-2 py-1">
                  <span className="font-semibold mr-2">🏠 Address:</span>
                  <span>{user.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-lg font-bold mb-4">Achievements</h2>
            <div className="flex flex-wrap">
              {user.badges.map((badge) => (
                <div key={badge.id} className="items-center mr-10 ml-8 mb-2">
                  <div className="badge">
                    <img
                      className="w-14 h-14 rounded-full"
                      style={{ width: "7rem", height: "7rem" }}
                      src={badge.imageUrl}
                      alt={badge.name}
                    />
                    <span className="text-sm text-gray-900">{badge.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-lg font-bold mb-4">Current Courses</h2>
            <ul>
              {user.currentCourses.map((course) => (
                <li key={course.id} className="text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span>{course.title}</span>
                    <span className="text-xs text-gray-500">
                      {course.progress}
                    </span>
                  </div>
                  {/* Graphical representation of course progress */}
                  <div className="h-2 bg-blue-200 mt-1 rounded">
                    <div
                      className="h-full bg-blue-500 rounded"
                      style={{ width: course.progress }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Homepage>
  );
};

export default UserProfile;
