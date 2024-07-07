import React, { useEffect, useState } from "react";
import Homepage from "./Homepage";
import axios from "axios";

// Dummy course data
const dummyCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description:
      "Learn the basics of web development with HTML, CSS, and JavaScript.",
    category: "Technology",
    difficulty: "Beginner",
    popularity: 4.5,
    thumbnail:
      "https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/10/23170101/List-of-Professional-Courses-after-Graduation.gif",
  },
  {
    id: 2,
    title: "Digital Marketing Fundamentals",
    description:
      "Explore the core concepts of digital marketing and strategies for success.",
    category: "Business",
    difficulty: "Intermediate",
    popularity: 4.2,
    thumbnail:
      "https://www.classcentral.com/report/wp-content/uploads/2020/06/top-100-course-pandemic.png",
  },
  {
    id: 3,
    title: "Python Programming for Beginners",
    description: "Get started with Python programming language from scratch.",
    category: "Technology",
    difficulty: "Beginner",
    popularity: 4.7,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
  },
  {
    id: 4,
    title: "Financial Accounting Basics",
    description: "Learn the fundamental principles of financial accounting.",
    category: "Business",
    difficulty: "Intermediate",
    popularity: 4.0,
    thumbnail:
      "https://lh5.googleusercontent.com/proxy/tinTsQjvZ2xtlPoGLVtCWD-yriZj9MJgxIf8apXzf7ojXSPOzVFg_07A9yzXaLCguwZ1fze43W9Q8RBHTA",
  },
  {
    id: 5,
    title: "Data Structures and Algorithms in Java",
    description:
      "Master data structures and algorithms using the Java programming language.",
    category: "Technology",
    difficulty: "Intermediate",
    popularity: 4.6,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
  },
  {
    id: 6,
    title: "Introduction to Psychology",
    description:
      "Explore the fascinating world of psychology and human behavior.",
    category: "Social Sciences",
    difficulty: "Beginner",
    popularity: 4.3,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-oX8CahAYCtAKcKH6j8OkTGFSFwr0DKq4_SVTdv_SaVBw0EkJExtl8DnlzLO_4XUMTxM&usqp=CAU",
  },
  {
    id: 7,
    title: "Graphic Design Fundamentals",
    description:
      "Learn the basics of graphic design and create stunning visual content.",
    category: "Arts & Design",
    difficulty: "Beginner",
    popularity: 4.1,
    thumbnail:
      "https://ontariocoursepreview.tvo.org/cdn/shop/t/6/assets/img-hero-coursecat.svg?v=139047362454786900271611358720",
  },
  {
    id: 8,
    title: "Introduction to Machine Learning",
    description:
      "Discover the principles of machine learning and its applications.",
    category: "Technology",
    difficulty: "Intermediate",
    popularity: 4.8,
    thumbnail:
      "https://www.classcentral.com/report/wp-content/uploads/2022/09/Graphic-Design-BCG-Banner.png",
  },
  {
    id: 9,
    title: "Marketing Strategy Essentials",
    description:
      "Develop effective marketing strategies to drive business growth.",
    category: "Business",
    difficulty: "Intermediate",
    popularity: 4.4,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_-iRUFqQ7jwXMT-786vYSyLdkMTlFLWgqqgQyDQYk7JuTNR8gOALx4mgg7oywj717UI&usqp=CAU",
  },
  {
    id: 10,
    title: "Spanish Language Basics",
    description:
      "Learn the basics of the Spanish language including grammar and vocabulary.",
    category: "Language",
    difficulty: "Beginner",
    popularity: 4.2,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
  },
  {
    id: 11,
    title: "Spanish Language Basics",
    description:
      "Learn the basics of the Spanish language including grammar and vocabulary.",
    category: "Language",
    difficulty: "Beginner",
    popularity: 4.2,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
  },
  {
    id: 12,
    title: "Spanish Language Basics",
    description:
      "Learn the basics of the Spanish language including grammar and vocabulary.",
    category: "Language",
    difficulty: "Beginner",
    popularity: 4.2,
    thumbnail:
      "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
  },
  // Add more courses as needed
];

const CourseCatalogPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch courses from API or local storage
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/institute/courses/teacher')
        setCourses(res.data.courses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCourses();
  } , [])

  // Filter courses based on search query, category, and difficulty
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || course.category === selectedCategory) &&
      (selectedDifficulty === "" || course.difficulty === selectedDifficulty)
    );
  });

  // Sort courses based on popularity
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "popularity") {
      // Sort from low to high popularity
      return a.popularity - b.popularity;
    } else if (sortBy === "popularity_high_to_low") {
      // Sort from high to low popularity
      return b.popularity - a.popularity;
    } else {
      return 0;
    }
  }); // Sort B

  return (
    <Homepage>
      <div className="container mx-auto px-4 py-8">
        {/* <h3 className="text-2xl font-semibold mb-6">Explore Courses</h3> */}
        <div className="flex items-center justify-between mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search courses..."
            className="w-4/5 px-6 py-2.5 mb-4 border border-red-900 rounded-md focus:outline-none focus:border-blue-500 shadow-md transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filter Options */}
          <div className="relative">
            {/* Filter Button */}
            <button
              className="px-10 py-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 shadow-md transition-all duration-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter
            </button>

            {/* Dropdown for Filter Options */}
            {showFilters && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-64 z-10">
                {/* Category Filter */}
                <select
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Arts & Design">Arts & Design</option>
                  <option value="Language">Language</option>
                </select>

                {/* Difficulty Filter */}
                <select
                  className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="">All Difficulty Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* Sort By */}
                <select
                  className="w-full px-4 py-3 focus:outline-none focus:border-blue-500 focus:shadow-md transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="popularity">Popularity (Low to High)</option>
                  <option value="popularity_high_to_low">
                    Popularity (High to Low)
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {course.category} | {course.difficulty}
                  </p>
                  <p className="text-sm text-gray-500">
                    Popularity: {course.popularity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Homepage>
  );
};

export default CourseCatalogPage;
