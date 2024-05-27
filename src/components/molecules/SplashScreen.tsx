import React, { useEffect, useRef, useState } from "react";
import "./splashScreen.css";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const splashUrl = process.env.REACT_APP_SHOPIFY_STOREFRONT_SPLASH_URL;

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && videoElement) {
        const videoDuration = videoElement.duration || 1.5;
        setIsSplashVisible(true);
        setTimeout(() => {
          setIsSplashVisible(false);
        }, videoDuration * 1000);
      } else {
        setIsSplashVisible(true);
      }
    };

    const handleLoadedMetadata = () => {
      let videoDuration = 1.5;
      if (videoElement) {
        videoDuration = videoElement.duration;
      }
      setIsSplashVisible(true);
      setTimeout(() => {
        setIsSplashVisible(false);
      }, videoDuration * 1000);
    };

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  return isSplashVisible ? (
    <div className="splash-screen">
      {splashUrl ? (
        <video
          className="splash-video"
          ref={videoRef}
          src={splashUrl}
          autoPlay
          muted
          loop
        />
      ) : (
        <>Loading ...</>
      )}
    </div>
  ) : null;
}
