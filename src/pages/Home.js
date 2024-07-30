import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homepage from "./Homepage";
import "./Home.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectState } from "./Redux/ReduxSlices";
import PopupComponent from "../utils/Popup/PopupComponent";
const ArrowCircle = styled.div`
  color: white;
  font-size: 25px;
  width: 44px;
  height: 44px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  line-height: 1.5;
`;

function Home() {
  // const PrevArrow = (props) => (
  //   <div {...props} className="slick-arrow-prev">
  //     <div className="arrow-circle">{"<"}</div>
  //   </div>
  // );

  // // Custom next arrow component
  // const NextArrow = (props) => (
  //   <div {...props} className="slick-arrow-next">
  //     <div className="arrow-circle">{">"}</div>
  //   </div>
  // );
  const PrevArrow = (props) => (
    <ArrowCircle {...props} className="slick-arrow-prev">
      {"<"}
    </ArrowCircle>
  );

  // Custom next arrow component
  const NextArrow = (props) => (
    <ArrowCircle {...props} className="slick-arrow-next">
      {">"}
    </ArrowCircle>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Add navigation arrows
    prevArrow: <PrevArrow />, // Custom previous arrow component
    nextArrow: <NextArrow />, // Custom next arrow component
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint for smaller screens if needed
        settings: {
          arrows: false, // Hide arrows on smaller screens
        },
      },
    ],
  };

  const user = useSelector(selectState);    
  const [showPopup, setShowPopup] = useState(false);
  const prevUserIdRef = useRef(null);

  useEffect(() => {
    if (user && user._id !== prevUserIdRef.current) {
      setShowPopup(true);
      prevUserIdRef.current = user._id;
      setTimeout(() => {
        setShowPopup(false);
      }, 4500);
      // console .log(prevUserIdRef.current + "  " + user._id)
    }
    // },user._id);
  },user);
  return (
    <Homepage >
      {showPopup && <PopupComponent message={`You have successfully logged in as ${user.role}`} />}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Slider {...settings}>
          <div className="flex justify-center">
            <img
              src="https://img-c.udemycdn.com/notices/featured_carousel_slide/image/9ea59bc2-bd61-463e-9ce9-7e71e8e586ae.jpg"
              alt="Slide 1"
              className="w-1340 h-400 object-cover"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/2c7e2024-64a4-498e-ab41-096b9c5dc216.png"
              alt="Slide 2"
              className="w-1340 h-400 object-cover"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://img-c.udemycdn.com/notices/featured_carousel_slide/image/65540944-d2e5-4e12-af78-ce1a2c691aeb.jpg"
              alt="Slide 3"
              className="w-1340 h-400 object-cover"
            />
          </div>
        </Slider>

        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome to Our Course Platform
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Explore a wide range of courses to enhance your skills and
            knowledge.
          </p>
          <div className="flex justify-center mt-8">
            <Link to="/courses">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Browse Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Homepage>
  );
}

export default Home;
