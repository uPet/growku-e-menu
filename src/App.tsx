import React from "react";

import "./App.css";
import HomePageView from "./components/pages/Home";
import SplashScreen from "./components/molecules/SplashScreen";
import { ConfigProvider } from "./components/organisms/ConfigContext";

function App() {
  return (
    <ConfigProvider>
      <SplashScreen />
      <HomePageView />
    </ConfigProvider>
  );
}

export default App;
