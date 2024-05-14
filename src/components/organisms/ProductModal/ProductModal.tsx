import React from "react";
import { Product } from "../../../model/product";
import CloseIcon from "../../atoms/CloseIcon";

import "./productModal.css";

const ProductModal = ({
  product,
  productModalRef,
  closeModal,
}: {
  product: Product;
  productModalRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
}) => {
  return (
    <div className="modal-overlay" ref={productModalRef} onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          <CloseIcon />
        </button>
        <h3 className="h5">{product.title}</h3>
        <p>{product.description}</p>
        <p>
          <>
            {product.compareAtPrice && (
              <span className="compare-at-price">{product.compareAtPrice}</span>
            )}
            <span>{product.price}</span>
          </>
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
                  crossOrigin="anonymous"
                  controls
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

export default ProductModal;
