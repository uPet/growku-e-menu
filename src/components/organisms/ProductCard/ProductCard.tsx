import React, { useRef } from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import { Product } from "../../../model/product";
import ProductModal from "../ProductModal/ProductModal";

type ProductCardProps = {
  product: Product;
} & React.ImgHTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  product,
  ...cardProps
}: ProductCardProps) {
  const productModalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    if (productModalRef.current) {
      productModalRef.current.style.visibility = "visible";
    }
  };

  const closeModal = () => {
    document.body.style.overflow = "";
    if (productModalRef.current) {
      productModalRef.current.style.visibility = "hidden";
    }
  };

  return (
    <>
      <Card {...cardProps}>
        <CardActionArea onClick={() => openModal()}>
          <CardContent>
            <h3 className="h5">{product.title}</h3>
            <p>{product.description}</p>
            <p>
              {product.compareAtPrice && (
                <span className="compare-at-price">
                  {product.compareAtPrice}
                </span>
              )}
              <span>{product.price}</span>
            </p>
          </CardContent>
          <CardMedia src={product?.featuredImage.url} alt={product.title} />
        </CardActionArea>
      </Card>
      <ProductModal
        closeModal={closeModal}
        product={product}
        productModalRef={productModalRef}
        key={product.title}
      />
    </>
  );
}
