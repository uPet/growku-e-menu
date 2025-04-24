import React, { useEffect, useState } from "react";

import "./splashScreen.css";
import { useConfig } from "../organisms/ConfigContext";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const { configData, isLoading } = useConfig();

  const splashVideoUrl = configData.splash_video_url;
  const splashImage = configData.splash_image_url;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsSplashVisible(true);
      } else {
        setIsSplashVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [splashVideoUrl]);

  // hide the splash screen video after 10 seconds if isSplashVisible is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSplashVisible) {
      timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 10000); // 10 seconds
    }
    return () => clearTimeout(timer);
  }, [isSplashVisible]);

  return isLoading && isSplashVisible ? (
    <div className="splash-screen">
      {splashVideoUrl && (
        <video
          crossOrigin="anonymous"
          muted
          autoPlay
          className="splash-video ignore-autoplay"

          onEnded={() => setIsSplashVisible(false)}
        >
          <source src={splashVideoUrl} type="video/mp4" />
          Loading view, Your browser does not support the video tag.
        </video>
      )}
      {!splashVideoUrl && splashImage && (
        <img
          src={splashImage}
          alt="Splash"
          className="splash-image"
          onLoad={() => setIsSplashVisible(false)}
        />
      )}
    </div>
  ) : null;
}
