import { useState } from "react";
import { Product } from "../../../model/product";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";

const Products = ({
  allProducts,
  categoryProducts,
}: {
  allProducts: Product[];
  categoryProducts: Product[];
}) => {
  const [shownProductIndex, setShownProductIndex] = useState<number | null>(
    null
  );

  // As the product could exists in multiple categories, we remove the duplicated products
  const uniqueProducts = allProducts.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.title === product.title)
  );

  return (
    <div className="cards-wrapper">
      {uniqueProducts.map((product, index) => {
        const shouldBeHidden = !categoryProducts?.some(
          (categoryProduct) => categoryProduct.title === product.title
        );
        const productCategoryIndex = categoryProducts?.findIndex(
          (categoryProduct) => categoryProduct.title === product.title
        );
        return (
          <ProductCard
            className={shouldBeHidden ? "hidden" : ""}
            key={`${product.title}-${index}`}
            product={product}
            productIndex={
              productCategoryIndex !== -1 ? productCategoryIndex : null
            }
            isLastProduct={index === categoryProducts?.length - 1}
            shownProductIndex={shownProductIndex}
            setShownProductIndex={setShownProductIndex}
          />
        );
      })}
    </div>
  );
};

export default Products;
