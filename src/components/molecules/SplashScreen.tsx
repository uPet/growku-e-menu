import React, { useEffect, useRef, useState } from "react";

import "./splashScreen.css";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const splashUrl =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_SPLASH_URL;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && videoRef.current) {
        const videoDuration = videoRef.current.duration || 1.5;
        setIsSplashVisible(true);
        setTimeout(() => {
          setIsSplashVisible(false);
        }, videoDuration * 1000);
      } else {
        setIsSplashVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial display of the splash screen based on video length
    const handleLoadedMetadata = () => {
      let videoDuration = 1.5;
      if (videoRef.current) {
        videoDuration = videoRef.current.duration;
      }
      setIsSplashVisible(true);
      setTimeout(() => {
        setIsSplashVisible(false);
      }, videoDuration * 1000);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (videoRef.current) {
        videoRef.current.removeEventListener(
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
  ) : (
    <></>
  );
}
