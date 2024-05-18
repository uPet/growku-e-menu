import { Product } from "../../../model/product";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";

const Products = ({
  allProducts,
  categoryProducts,
}: {
  allProducts: Product[];
  categoryProducts?: Product[];
}) => {
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
        return (
          <ProductCard
            className={shouldBeHidden ? "hidden" : ""}
            key={`${product.title}-${index}`}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default Products;
