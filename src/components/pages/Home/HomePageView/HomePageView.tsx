import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../../model/product";
import { getCategoriesData } from "../../../../api/categories-graphql";
import { Category } from "../../../../model/category";
import "./HomePageView.css"; // Import the CSS file for styling
import { useCreateProductsContext } from "../../../organisms/ProductsProvider";

const HomePageView = () => {
  const { products } = useCreateProductsContext()
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await getCategoriesData();
        if (!categoriesData) return;

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product =>
        product.collections.some(collection => collection.id === selectedCategory)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="home-page-container">
      <div className="categories-menu">
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
              {category.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="products-container">
        <h2>Products</h2>
        <div className="product-cards">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.title}`} key={product.title} className="product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageView;
