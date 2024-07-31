import React, { useState } from "react";
import DropDownIcon from "../CourseDetailPage/DropDown-Icon.svg";
import { selectState } from "../Redux/ReduxSlices";
import { useSelector } from "react-redux";
const LectureList = ({ lectures, onVideoUrlUpdate }) => {
  const user = useSelector(selectState)
  const [expandedChapters, setExpandedChapters] = useState({});
  const [uploadedVideos, setUploadedVideos] = useState({});
  const [videoDurations, setVideoDurations] = useState({});

  const toggleChapter = (index) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleUpload = (chapterIndex, sectionIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const videoPath = URL.createObjectURL(file);
      setUploadedVideos((prev) => ({
        ...prev,
        [`${chapterIndex}-${sectionIndex}`]: videoPath,
      }));

      const videoElement = document.createElement('video');
      videoElement.src = videoPath;
      videoElement.onloadedmetadata = () => {
        setVideoDurations((prev) => ({
          ...prev,
          [`${chapterIndex}-${sectionIndex}`]: videoElement.duration,
        }));
      };
    }
  };

  const handleWatch = (chapterIndex, sectionIndex) => {
    const videoKey = `${chapterIndex}-${sectionIndex}`;
    if (uploadedVideos[videoKey]) {
      onVideoUrlUpdate(uploadedVideos[videoKey]);
    } else {
      alert("No video uploaded for this section.");
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="lecture-list bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-3xl font-bold mb-4">Lecture List</h2>
      {lectures.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="mb-4">
          <div
            className="flex items-center cursor-pointer border border-black rounded p-2.5"
            onClick={() => toggleChapter(chapterIndex)}
          >
            <h3 className="text-2xl font-semibold mb-2">{chapter.chapterTitle}</h3>
            <img src={DropDownIcon} className="ml-2" alt="Toggle" />
          </div>
          <div className={`collapsible-content ${expandedChapters[chapterIndex] ? "expanded" : ""} border rounded`}>
            <ul className="pl-4">
              {chapter.sections.map((section, sectionIndex) => (
                <li key={sectionIndex} className="text-gray-700 border border-gray p-3.5 m-1 rounded flex justify-between items-center">
                  <div className="flex items-center">
                    {section}
                    {videoDurations[`${chapterIndex}-${sectionIndex}`] && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({formatDuration(videoDurations[`${chapterIndex}-${sectionIndex}`])})
                      </span>
                    )}
                  </div>
                  <div className="ml-4 flex space-x-2">
                    {user.role === "teacher" &&
                    
                    <label className="btn-upload  pt-2">
                      Upload
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(event) => handleUpload(chapterIndex, sectionIndex, event)}
                        className="hidden"
                      />
                    </label>
                    }
                    <button
                      onClick={() => handleWatch(chapterIndex, sectionIndex)}
                      className="btn-watch bg-blue-500 text-white rounded p-2"
                    >
                      Watch
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LectureList;
