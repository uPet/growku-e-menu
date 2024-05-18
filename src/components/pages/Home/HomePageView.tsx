import React, { useEffect, useRef, useState } from "react";

import Menu from "../../atoms/Menu/Menu";
import { Category } from "../../../model/category";
import { getCategoriesData } from "../../../api/categories-graphql";
import { Product } from "../../../model/product";
import Products from "../../organisms/Products/Products";
import Toaster from "../../atoms/Toaster.tsx/Toaster";
import useAutoPlayVideo from "../../../hooks/useAutoPlayVideo";

const HomePageView = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategoriesWithProducts() {
      try {
        const categoriesData = await getCategoriesData();
        if (!categoriesData) return;
        setError("");
        setCategories(
          categoriesData.sort((a, b) => a.title.localeCompare(b.title))
        );
        setSelectedCategory(categoriesData[0]?.title);
      } catch (error: any) {
        setError(
          `Error fetching data. Please try again later, ${error?.message}`
        );
      }
    }

    fetchCategoriesWithProducts();
  }, []);

  // Set all available products once we get the data
  useEffect(() => {
    if (!categories || allProducts.length) return;

    const allAvailableProducts = categories.reduce(
      (acc, category) => [...acc, ...category.products],
      [] as Product[]
    );
    setAllProducts(allAvailableProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  // Custom hook to autoplay videos so we can preload them
  useAutoPlayVideo({ allProducts });

  const getProductsByCategory = () => {
    if (!categories || !selectedCategory) return;

    const products = categories.find(
      (category) => category.title === selectedCategory
    )?.products;

    return products;
  };

  const onCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);

    if (menuContentRef.current) {
      menuContentRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <div className="layout">
        <h1 className="page-header">
          {process.env.REACT_APP_SHOPIFY_STOREFRONT_NAME}
        </h1>
        <Menu
          contentRef={menuContentRef}
          items={categories.map((category) => category.title)}
          selectedItem={selectedCategory}
          onClick={onCategoryChange}
        >
          <h2>{selectedCategory}</h2>
          <Products
            allProducts={allProducts}
            categoryProducts={getProductsByCategory()}
          />
        </Menu>
      </div>
      <Toaster
        message={error}
        isVisible={Boolean(error)}
        onClose={() => setError("")}
      />
    </>
  );
};

export default HomePageView;
