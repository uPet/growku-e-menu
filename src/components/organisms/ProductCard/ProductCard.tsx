import React, { memo, useEffect, useRef } from "react";

import "./productCard.css";

import Card, { CardVariant } from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import ProductModal from "../ProductModal/ProductModal";
import { ProductCardType } from "../../pages/Home/HomePageView";
import { useConfig } from "../ConfigContext";

type ProductCardProps = {
  shouldBeHidden: boolean;
  shouldBeHide: boolean;
  product: ProductCardType;
  productIndex: number | null;
  shownProductIndex: number | null;
  setShownProductIndex: React.Dispatch<React.SetStateAction<number | null>>;
} & React.ImgHTMLAttributes<HTMLDivElement>;

const NUMBER_OF_FEATURED_PRODUCTS = 4;

function ProductCard({
  shouldBeHidden, // TODO: update the name
  shouldBeHide, // TODO: update the name
  product,
  productIndex,
  shownProductIndex,
  setShownProductIndex,
  ...cardProps
}: ProductCardProps) {
  const productModalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { configData } = useConfig();
  const HOME_CATEGORY_TITLE = configData.home_category_title;

  let variant: CardVariant = "default";

  if (
    product.productIndexOfCategory < NUMBER_OF_FEATURED_PRODUCTS ||
    product.category === HOME_CATEGORY_TITLE
  ) {
    variant = "featured";
  }

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
      productModalRef.current.classList.remove("next-product-modal");
      return;
    }

    const isLastProductInPreviousCategory = product.isLastProductOfCategory;

    const isThisPreviousProductModal =
      !isLastProductInPreviousCategory &&
      productIndex === shownProductIndex - 1;

    const isThisNextProductModal =
      !product.isLastProductOfCategory &&
      productIndex === shownProductIndex + 1;

    if (isThisNextProductModal) {
      productModalRef.current.classList.add("next-product-modal");
    } else {
      productModalRef.current?.classList.remove("next-product-modal");
    }

    if (isThisPreviousProductModal) {
      productModalRef.current.classList.add("previous-product-modal");
    } else {
      productModalRef.current?.classList.remove("previous-product-modal");
    }
  }, [shownProductIndex, productIndex, product.isLastProductOfCategory]);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    setShownProductIndex(productIndex);
    if (!productModalRef.current || productIndex === null) return;

    productModalRef.current.classList.remove("product-modal-close");
    productModalRef.current.classList.add("product-modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    if (!productModalRef.current) return;

    productModalRef.current.classList.add("product-modal-close");
    productModalRef.current.classList.remove("product-modal-open");
  };

  return (
    <>
      <Card variant={variant} {...cardProps}>
        <CardActionArea onClick={openModal}>
          <CardMedia
            variant={variant}
            src={product?.featuredImage.url}
            alt={product.title}
          />
          <CardContent variant={variant}>
            <h2>{product.title}</h2>
            {variant === "default" && <h3>{product.description}</h3>}
            <p>
              {product.compareAtPrice && (
                <span className="h2 compare-text">
                  {product.compareAtPrice}
                </span>
              )}
              <span className="h2">${product.cashPrice || product.price}</span>
            </p>
          </CardContent>
        </CardActionArea>
      </Card>
      <ProductModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          closeModal();
          setShownProductIndex(null);
        }}
        product={product}
        productModalRef={productModalRef}
        key={product.title}
        // We are disabling the swipe feature for now, if we need it, jsut uncomment the lines below
        // onSwipeLeft={() => {
        //   if (productIndex === null) return;

        //   setShownProductIndex(
        //     product.isLastProductOfCategory ? productIndex : productIndex + 1
        //   );
        // }}
        // onSwipeRight={() => {
        //   if (productIndex === null) return;
        //   setShownProductIndex(
        //     product.isFirstProductOfCategory ? null : productIndex - 1
        //   );
        // }}
      />
    </>
  );
}

// TODO: Refactor this function to be readable and clear
const areEqual = (prevProps: ProductCardProps, nextProps: ProductCardProps) => {
  const equal =
    prevProps.product === nextProps.product &&
    prevProps.productIndex === nextProps.productIndex &&
    prevProps.shownProductIndex !== nextProps.shownProductIndex &&
    prevProps.shouldBeHidden === nextProps.shouldBeHidden;

  if (
    nextProps.shownProductIndex &&
    nextProps.shownProductIndex + 2 === nextProps.productIndex
  ) {
    // We need to re-render to update the component to remove the previous-product-modal class
    return false;
  }

  if (
    nextProps.shownProductIndex &&
    (nextProps.shownProductIndex - 2 === nextProps.productIndex ||
      nextProps.shownProductIndex - 1 === nextProps.productIndex)
  ) {
    // We need to re-render to update the component to remove the previous-product-modal class
    return false;
  }

  if (prevProps.shouldBeHide !== nextProps.shouldBeHide) {
    return false;
  }

  if (
    prevProps.shouldBeHide === nextProps.shouldBeHide &&
    prevProps.shownProductIndex === nextProps.shownProductIndex
  ) {
    return true;
  }

  return equal;
};

export default memo(ProductCard, areEqual);
