import React from "react";

import "./App.css";
import HomePageView from "./components/pages/Home";
import SplashScreen from "./components/molecules/SplashScreen";

function App() {
  return (
    <>
      <SplashScreen />
      <HomePageView />
    </>
  );
}

export default App;
