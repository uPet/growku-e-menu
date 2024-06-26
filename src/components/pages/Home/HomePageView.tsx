import React, { useEffect, useRef, useState } from "react";

import Menu from "../../atoms/Menu/Menu";
import { Category } from "../../../model/category";
import { getCategoriesData } from "../../../api/categories-graphql";
import { Product } from "../../../model/product";
import Products from "../../organisms/Products/Products";
import Toaster from "../../atoms/Toaster.tsx/Toaster";
import useAutoPlayVideo from "../../../hooks/useAutoPlayVideo";
import { useConfig } from "../../organisms/ConfigContext";

export type ProductCardType = Product & {
  productIndexOfCategory: number;
  isFirstProductOfCategory: boolean;
  isLastProductOfCategory: boolean;
  category: string;
};

const HomePageView = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allProducts, setAllProducts] = useState<ProductCardType[]>([]);
  const [error, setError] = useState<string>("");
  const { configData } = useConfig();

  const storeName = configData.find(
    (item) => item.option === "store-name"
  )?.value;

  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategoriesWithProducts() {
      try {
        const categoriesData = await getCategoriesData();
        if (!categoriesData) return;
        setError("");
        setCategories(categoriesData);
        setSelectedCategory(categoriesData?.[0]?.title);
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

    const allAvailableProducts = categories.reduce<ProductCardType[]>(
      (acc, category) => {
        const products = category.products.map((product) => ({
          ...product,
          category: category.title,
          productIndexOfCategory: category.products.indexOf(product),
          isFirstProductOfCategory: category.products.indexOf(product) === 0,
          isLastProductOfCategory:
            category.products.indexOf(product) === category.products.length - 1,
        }));
        return [...acc, ...products];
      },
      []
    );

    setAllProducts(allAvailableProducts);
  }, [categories, allProducts.length]);

  // Custom hook to autoplay videos so we can preload them
  useAutoPlayVideo(Boolean(allProducts.length));

  const onCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);

    if (menuContentRef.current) {
      menuContentRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <div className="layout">
        {storeName && <h1 className="page-header">{storeName}</h1>}
        <Menu
          menuContentProps={{ ref: menuContentRef }}
          items={categories.map((category) => category.title)}
          selectedItem={selectedCategory}
          onClick={onCategoryChange}
        >
          <h2>{selectedCategory}</h2>
          <Products items={allProducts} selectedCategory={selectedCategory} />
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
