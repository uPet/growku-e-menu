import React, { useEffect, useState } from "react";

import "./splashScreen.css";
import { useConfig } from "../organisms/ConfigContext";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const { configData, isLoading } = useConfig();

  const splashUrl = configData.find(
    (item) => item.option === "video-url"
  )?.value;

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
  }, [splashUrl]);

  return isLoading && isSplashVisible ? (
    <div className="splash-screen">
      {splashUrl && (
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
      )}
    </div>
  ) : null;
}
