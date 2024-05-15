import React, { useEffect, useRef, useState } from "react";

import Menu from "../../atoms/Menu/Menu";
import { Category } from "../../../model/category";
import { getCategoriesData } from "../../../api/categories-graphql";
import { Product } from "../../../model/product";
import Products from "../../organisms/Products/Products";

const HomePageView = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const menuContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (menuContentRef.current) {
      menuContentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    async function fetchCategoriesWithProducts() {
      try {
        const categoriesData = await getCategoriesData();
        if (!categoriesData) return;

        setCategories(
          categoriesData.sort((a, b) => a.title.localeCompare(b.title))
        );
        setSelectedCategory(categoriesData[0].title);
        setProducts(categoriesData[0].products);
        const allProducts = categoriesData.reduce(
          (acc, category) => [...acc, ...category.products],
          [] as Product[]
        );
        setAllProducts(allProducts);
      } catch (error) {
        // TODO: handle the error here!
        console.error("Error fetching data:", error);
      }
    }

    fetchCategoriesWithProducts();
  }, []);

  const onCategoryChange = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    const selectedCategoryData = categories.find(
      (category) => category.title === categoryTitle
    );

    if (selectedCategoryData) {
      setProducts(selectedCategoryData.products);
    }
    scrollToTop();
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
          <Products products={products} />
        </Menu>
      </div>
      {/* Render all the products so images are preloaded */}
      <div className="" style={{ display: "none" }}>
        <Products products={allProducts} />
      </div>
    </>
  );
};

export default HomePageView;
