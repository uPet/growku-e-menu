import React from "react";
import "./App.css";
import HomePageView from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from "./components/pages/Home/ProductDetailsPage";
import ProductsProvider from "./components/organisms/ProductsProvider";

function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route index element={<HomePageView />} />
        <Route path="/product/:productTitle" element={<ProductDetailsPage />} />
      </Routes>
    </ProductsProvider>
  );
}

export default App;
