import React from "react";

import "./App.css";
import HomePageView from "./components/pages/Home";
// import SplashScreen from "./components/molecules/SplashScreen";
import { ConfigProvider } from "./components/organisms/ConfigContext";
import ThemeVariables from "./components/molecules/ThemeVariables";
import ErrorBoundary from "./ErrorBoundary"; // 👈 TS version

function App() {
  return (
    <ConfigProvider>
      <ErrorBoundary>
        {/* <SplashScreen /> */}
        <ThemeVariables />
        <HomePageView />
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
