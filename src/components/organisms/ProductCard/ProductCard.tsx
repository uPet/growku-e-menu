import React, { useEffect, useRef } from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import ProductModal from "../ProductModal/ProductModal";
import { ProductCardType } from "../../pages/Home/HomePageView";

type ProductCardProps = {
  product: ProductCardType;
  productIndex: number | null;
  shownProductIndex: number | null;
  setShownProductIndex: React.Dispatch<React.SetStateAction<number | null>>;
} & React.ImgHTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  product,
  productIndex,
  shownProductIndex,
  setShownProductIndex,
  ...cardProps
}: ProductCardProps) {
  const productModalRef = useRef<HTMLDivElement>(null);

  // Show or hide the modal when the user swipe left or right
  useEffect(() => {
    if (productIndex === undefined) return;

    const isCurrentProductModalShown = productIndex === shownProductIndex;
    if (isCurrentProductModalShown) {
      openModal();
    } else {
      closeModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownProductIndex, productIndex]);

  // Identify if the current product is the previous product in the category
  useEffect(() => {
    if (!productModalRef.current) return;

    if (shownProductIndex === null) {
      productModalRef.current.classList.remove("previous-product-modal");
      return;
    }

    const isLastProductInPreviousCategory = product.isLastProductOfCategory;

    const isThisPreviousProductModal =
      !isLastProductInPreviousCategory &&
      productIndex === shownProductIndex - 1;

    if (isThisPreviousProductModal) {
      productModalRef.current.classList.add("previous-product-modal");
    } else {
      productModalRef.current?.classList.remove("previous-product-modal");
    }
  }, [shownProductIndex, productIndex, product.isLastProductOfCategory]);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShownProductIndex(productIndex);
    if (!productModalRef.current || productIndex === null) return;

    productModalRef.current.classList.remove("product-modal-close");
    productModalRef.current.classList.add("product-modal-open");
  };

  const closeModal = () => {
    document.body.style.overflow = "";
    if (!productModalRef.current) return;

    productModalRef.current.classList.add("product-modal-close");
    productModalRef.current.classList.remove("product-modal-open");
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
          if (productIndex === null) return;

          setShownProductIndex(
            product.isLastProductOfCategory ? productIndex : productIndex + 1
          );
        }}
        onSwipeRight={() => {
          if (productIndex === null) return;

          setShownProductIndex(
            product.isFirstProductOfCategory ? null : productIndex - 1
          );
        }}
      />
    </>
  );
}
