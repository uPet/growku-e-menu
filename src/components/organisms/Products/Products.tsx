import { Product } from "../../../model/product";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";

const Products = ({ products }: { products: Product[] }) => {
  return (
    <div className="cards-wrapper">
      {products.map((product, index) => (
        <ProductCard key={`${product.title}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default Products;
