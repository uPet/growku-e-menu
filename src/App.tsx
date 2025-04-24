import React from "react";

import "./App.css";
import HomePageView from "./components/pages/Home";
// import SplashScreen from "./components/molecules/SplashScreen";
import { ConfigProvider } from "./components/organisms/ConfigContext";
import ThemeVariables from "./components/molecules/ThemeVariables";

function App() {
  return (
    <ConfigProvider>
      {/* <SplashScreen /> */}
      <ThemeVariables />
      <HomePageView />
    </ConfigProvider>
  );
}

export default App;
