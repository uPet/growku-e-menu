import React, { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsSplashVisible(true);
      }
      if (document.visibilityState === "visible") {
        setIsSplashVisible(true);
        setTimeout(() => {
          setIsSplashVisible(false);
        }, 1500);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isSplashVisible ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
        fontSize: "2rem",
      }}
    >
      Loading...
    </div>
  ) : (
    <></>
  );
}
