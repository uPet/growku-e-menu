import React, { useEffect, useRef } from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import { Product } from "../../../model/product";
import ProductModal from "../ProductModal/ProductModal";

type ProductCardProps = {
  product: Product;
  productIndex: number | null; // This is the product index per products of a category
  isLastProduct: boolean;
  shownProductIndex: number | null;
  setShownProductIndex: React.Dispatch<React.SetStateAction<number | null>>;
} & React.ImgHTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  product,
  productIndex,
  isLastProduct,
  shownProductIndex,
  setShownProductIndex,
  ...cardProps
}: ProductCardProps) {
  const productModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productIndex === undefined) return;

    const isCurrentProductModal = productIndex === shownProductIndex;
    if (isCurrentProductModal) {
      openModal();
    } else {
      closeModal();
    }

    // TODO: we could split this into another useEffect
    if (shownProductIndex !== null && shownProductIndex !== -1) {
      const isPreviousProductModal = productIndex === shownProductIndex - 1;

      if (isPreviousProductModal && productModalRef.current) {
        productModalRef.current.classList.add("previous-product-modal");
      } else {
        productModalRef.current?.classList.remove("previous-product-modal");
      }
    } else {
      productModalRef.current?.classList.remove("previous-product-modal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownProductIndex, productIndex]);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShownProductIndex(productIndex);
    if (productModalRef.current && productIndex !== null) {
      productModalRef.current.classList.remove("product-modal-close");
      productModalRef.current.classList.add("product-modal-open");
    }
  };

  const closeModal = () => {
    document.body.style.overflow = "";
    if (productModalRef.current) {
      productModalRef.current.classList.add("product-modal-close");
      productModalRef.current.classList.remove("product-modal-open");
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
        closeModal={() => {
          closeModal();
          setShownProductIndex(null);
        }}
        product={product}
        productModalRef={productModalRef}
        key={product.title}
        onSwipeLeft={() => {
          if (productIndex !== null) {
            setShownProductIndex(
              isLastProduct ? productIndex : productIndex + 1
            );
          }
        }}
        onSwipeRight={() => {
          if (productIndex !== null) {
            setShownProductIndex(productIndex === 0 ? null : productIndex - 1);
          }
        }}
      />
    </>
  );
}
