import React, { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      setIsLoading(true);
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    });
  }, []);

  return isLoading ? (
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
