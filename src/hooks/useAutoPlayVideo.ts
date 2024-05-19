import { useEffect, useState } from "react";

/**
 * useAutoPlayVideo - A custom hook to handle the autoplay of videos in a React app.
 * This hook is designed to preload and autoplay a series of videos, ensuring smooth
 * playback and resilience against network errors by caching the videos.
 *
 * @param {boolean} areVideosRendered - A boolean that indicates when the videos are rendered and ready to be processed.
 *
 * @returns {void} This hook does not return any value.
 *
 * @example
 * // Example usage of useAutoPlayVideo in a component
 * import React, { useState, useEffect } from "react";
 * import useAutoPlayVideo from "./path/to/useAutoPlayVideo";
 *
 * const VideoComponent = ({ allProducts }) => {
 *   const [areVideosRendered, setAreVideosRendered] = useState(false);
 *
 *   useEffect(() => {
 *     setAreVideosRendered(allProducts.length > 0);
 *   }, [allProducts]);
 *
 *   useAutoPlayVideo(areVideosRendered);
 *
 *   return (
 *     <div>
 *       {allProducts.map(product => (
 *         <video key={product.id} src={product.videoUrl} />
 *       ))}
 *     </div>
 *   );
 * };
 *
 * export default VideoComponent;
 */

export default function useAutoPlayVideo(areVideosRendered: boolean) {
  const [videos, setVideos] = useState<HTMLVideoElement[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Set all available videos
  useEffect(() => {
    if (!areVideosRendered) return;
    const allVideos = document.querySelectorAll("video");
    setVideos(allVideos as unknown as HTMLVideoElement[]);
  }, [areVideosRendered]);

  // Play the current video
  useEffect(() => {
    if (!videos) return;
    videos[currentVideoIndex]?.play();
  }, [currentVideoIndex, videos]);

  const handleVideoEnd = (index: number) => {
    const isNextVideoAvailable = index < videos.length - 1;
    if (isNextVideoAvailable) {
      setCurrentVideoIndex(index + 1);
    }
  };

  useEffect(() => {
    if (!videos.length) return;
    videos.forEach((video, index) => {
      video.addEventListener("ended", () => handleVideoEnd(index));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);
}
