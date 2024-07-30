import React from "react";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player bg-black rounded-md mb-4">
      <iframe
        src={videoUrl}
        title="Video Player"
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
