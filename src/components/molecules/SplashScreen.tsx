import React, { useEffect, useState } from "react";

import "./splashScreen.css";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const splashUrl = urlParams.get("video-url");

  const hideSplashAfterDelay = (delay = 1000) => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, delay);
  };

  useEffect(() => {
    if (!splashUrl) {
      hideSplashAfterDelay();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsSplashVisible(true);
        if (!splashUrl) {
          hideSplashAfterDelay();
        }
      } else {
        setIsSplashVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [splashUrl]);

  return isSplashVisible ? (
    <div className="splash-screen">
      {splashUrl ? (
        <video
          crossOrigin="anonymous"
          muted
          autoPlay
          className="splash-video ignore-autoplay"
          onEnded={() => setIsSplashVisible(false)}
        >
          <source src={splashUrl} type="video/mp4" />
          Loading view, Your browser does not support the video tag.
        </video>
      ) : (
        <>Loading ...</>
      )}
    </div>
  ) : null;
}
