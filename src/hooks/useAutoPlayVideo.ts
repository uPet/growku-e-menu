import { useEffect, useState } from "react";
import { Product } from "../model/product";

// Custom hook to autoplay videos so we can preload them
export default function useAutoPlayVideo({
  allProducts,
}: {
  allProducts: Product[];
}) {
  const [videos, setVideos] = useState<HTMLVideoElement[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Set all available videos
  useEffect(() => {
    if (!allProducts.length) return;

    const allVideos = document.querySelectorAll("video");
    setVideos(allVideos as unknown as HTMLVideoElement[]);
  }, [allProducts]);

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
