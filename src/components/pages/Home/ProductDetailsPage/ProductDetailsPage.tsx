import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../../model/product";
import { useCreateProductsContext } from "../../../organisms/ProductsProvider";

const ProductDetailsPage = () => {
  const { products } = useCreateProductsContext()
  const { productTitle } = useParams<{ productTitle: string }>();
  console.log('products :>> ', products);
  console.log('productTitle :>> ', productTitle);
  const product: Product | undefined = products.find(product => product.title === productTitle);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        {/* Add more details here if needed */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
