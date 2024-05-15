import React, { useState } from "react";
import Video from "./Video";

// TODO: move this into the components folder

const Videos = ({ allVideos }: { allVideos: string[] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div style={{ display: "none" }}>
      {allVideos.map((videoUrl, index) => (
        <Video
          key={videoUrl}
          url={videoUrl}
          autoPlay={index === currentVideoIndex}
          onEnded={handleVideoEnd}
        />
      ))}
    </div>
  );
};
export default Videos;
