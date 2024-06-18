import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";
import { ProductCardType } from "../../pages/Home/HomePageView";

const Products = ({
  items,
  selectedCategory,
}: {
  items: ProductCardType[];
  selectedCategory: string;
}) => {
  const [shownProductIndex, setShownProductIndex] = useState<number | null>(
    null
  );

  return (
    <div className="cards-wrapper">
      {items.map((product, index) => {
        const shouldBeHidden = product.category !== selectedCategory;
        return (
          <ProductCard
            shouldBeHidden={index === shownProductIndex}
            className={shouldBeHidden ? "hidden" : ""}
            shouldBeHide={shouldBeHidden}
            key={`${product.title}-${index}`}
            product={product}
            productIndex={index}
            shownProductIndex={shownProductIndex}
            setShownProductIndex={setShownProductIndex}
          />
        );
      })}
    </div>
  );
};

export default Products;
