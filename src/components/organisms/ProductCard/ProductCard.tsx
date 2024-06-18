import React, { memo, useEffect, useRef } from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import ProductModal from "../ProductModal/ProductModal";
import { ProductCardType } from "../../pages/Home/HomePageView";

type ProductCardProps = {
  shouldBeHidden: boolean;
  shouldBeHide: boolean;
  product: ProductCardType;
  productIndex: number | null;
  shownProductIndex: number | null;
  setShownProductIndex: React.Dispatch<React.SetStateAction<number | null>>;
} & React.ImgHTMLAttributes<HTMLDivElement>;

function ProductCard({
  shouldBeHidden,
  shouldBeHide,
  product,
  productIndex,
  shownProductIndex,
  setShownProductIndex,
  ...cardProps
}: ProductCardProps) {
  const productModalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
      <Card {...cardProps}>
        <CardActionArea onClick={openModal}>
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
        isModalOpen={isModalOpen}
        closeModal={() => {
          closeModal();
          setShownProductIndex(null);
        }}
        product={product}
        productModalRef={productModalRef}
        key={product.title}
        onSwipeLeft={() => {
          if (productIndex === null) return;
          console.log("swipe left");

          setShownProductIndex(
            product.isLastProductOfCategory ? productIndex : productIndex + 1
          );
        }}
        onSwipeRight={() => {
          if (productIndex === null) return;
          console.log("swipe right");
          setShownProductIndex(
            product.isFirstProductOfCategory ? null : productIndex - 1
          );
        }}
      />
    </>
  );
}

const areEqual = (prevProps: ProductCardProps, nextProps: ProductCardProps) => {
  const equal =
    prevProps.product === nextProps.product &&
    prevProps.productIndex === nextProps.productIndex &&
    prevProps.shownProductIndex !== nextProps.shownProductIndex &&
    prevProps.shouldBeHidden === nextProps.shouldBeHidden;
  // prevProps.shownProductIndex === nextProps.shownProductIndex;

  // if (
  //   prevProps.product.handle === "arepita-con-chicharron-y-chorizo" ||
  //   nextProps.product.handle === "arepita-con-chicharron-y-chorizo" ||
  //   prevProps.product.title === "Crunchy Arepa con Pollo" ||
  //   nextProps.product.title === "Crunchy Arepa con Pollo"
  // ) {
  //   console.log(
  //     "ddddddddddddd prevProps",
  //     prevProps.product.handle,
  //     equal,
  //     prevProps
  //   );
  //   console.log(
  //     "ddddddddddddd nextProps",
  //     nextProps.product.handle,
  //     equal,
  //     nextProps
  //   );
  // }

  // if (
  //    nextProps.shouldBeHide && prevProps.shouldBeHide !== nextProps.shouldBeHide
  // ) {
  //   return true;
  // }

  // if (
  //   prevProps.product.title === "Sharing Picadita" ||
  //   nextProps.product.title === "Sharing Picadita"
  // ) {
  //   console.log("gggggggggggg equal", equal, prevProps, nextProps);
  // }

  if (
    nextProps.shownProductIndex &&
    (nextProps.shownProductIndex - 2 === nextProps.productIndex ||
      nextProps.shownProductIndex - 1 === nextProps.productIndex)
  ) {
    // We need to re-render to update the component to remove the previous-product-modal class
    return false;
  }

  if (prevProps.shouldBeHide !== nextProps.shouldBeHide) {
    // console.log(
    //   "false equal",
    //   false,
    //   prevProps.product.title,
    //   nextProps.product.title
    // );
    return false;
  }

  // TODO: this breaks the swipe, we need to add another condition with it
  if (
    prevProps.shouldBeHide === nextProps.shouldBeHide &&
    prevProps.shownProductIndex === nextProps.shownProductIndex
  ) {
    // console.log("true equal", true);
    return true;
  }

  // (nextProps.isFirstProductOfCategory && nextProps.shownProductIndex === null)
  // prevProps.productIndex !== nextProps.shownProductIndex;
  // prevProps.shownProductIndex !== null;

  // if (
  //   nextProps.product.isFirstProductOfCategory &&
  //   nextProps.shownProductIndex === null
  // ) {
  //   console.log(
  //     "ProductCard areEqual>>>>>>>>>>>>>>>>>>",
  //     false,
  //     nextProps.product.title
  //   );
  //   return false;
  // }

  // if (!equal) {
  //   console.log("equal", equal, prevProps.product.title, nextProps.product.title);
  // }
  return equal;
};

export default memo(ProductCard, areEqual);
