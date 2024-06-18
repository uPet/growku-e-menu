import React, { memo, useEffect, useRef } from "react";
import { Product } from "../../../model/product";
import CloseIcon from "../../atoms/CloseIcon";

import "./productModal.css";

const ProductModal = ({
  product,
  productModalRef,
  isModalOpen,
  closeModal,
  onSwipeLeft,
  onSwipeRight,
}: {
  product: Product;
  productModalRef: React.RefObject<HTMLDivElement>;
  isModalOpen: boolean;
  closeModal?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) => {
  const startX = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!startX.current) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX.current - currentX;
    const isSwipeLeft = diffX > 50;
    const isSwipeRight = diffX < -50;

    if (isSwipeLeft) {
      onSwipeLeft?.();
      startX.current = null;
    } else if (isSwipeRight) {
      onSwipeRight?.();
      startX.current = null;
    }
  };

  useEffect(() => {
    const modalElement = productModalRef.current;
    if (!modalElement) return;

    modalElement.addEventListener("touchstart", handleTouchStart);
    modalElement.addEventListener("touchmove", handleTouchMove);

    return () => {
      modalElement.removeEventListener("touchstart", handleTouchStart);
      modalElement.removeEventListener("touchmove", handleTouchMove);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productModalRef]);

  useEffect(() => {
    if (isModalOpen) {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.play();
          video.loop = true;
        }
      });
    }
  }, [isModalOpen, videoRefs]);

  const onCloseModal = () => {
    closeModal?.();
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  return (
    <div className="modal-overlay" ref={productModalRef} onClick={onCloseModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onCloseModal}>
          <CloseIcon />
        </button>
        <h3 className="h5">{product.title}</h3>
        <p>{product.description}</p>
        <p>
          {product.compareAtPrice && (
            <span className="compare-at-price">{product.compareAtPrice}</span>
          )}
          <span>{product.price}</span>
        </p>
        <div className="media-container">
          {product.media.map((item, index) => (
            <div className="media-item" key={index}>
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`${product.title}-${index}`}
                  className="modal-media"
                  style={{ maxWidth: item.width, maxHeight: item.height }}
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  crossOrigin="anonymous"
                  controls
                  muted
                  className="modal-media"
                  style={{ maxWidth: item.width, maxHeight: item.height }}
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// const areEqual = (prevProps: any, nextProps: any) => {
//   // console.log(
//   //   "ProductModal areEqual",
//   //   prevProps.product.handle,
//   //   nextProps.product.handle,
//   //   prevProps.product === nextProps.product
//   // );
//   return prevProps.product === nextProps.product;
// };

export default memo(ProductModal);
