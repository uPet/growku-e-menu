import React, { useEffect, useRef } from "react";
// TODO: move this into the components folder
const Video = ({
  url,
  autoPlay,
  onEnded,
}: {
  url: string;
  autoPlay: boolean;
  onEnded: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", onEnded);
      if (autoPlay) {
        video.play();
      }
      return () => {
        video.removeEventListener("ended", onEnded);
      };
    }
  }, [autoPlay, onEnded]);

  return (
    <video ref={videoRef} crossOrigin="anonymous" controls muted>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
