import * as React from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import CloseIcon from "../../atoms/CloseIcon";
import { useState } from "react";

interface Product {
  title: string;
  description: string;
  price: string;
  media: { type: 'image' | 'video'; url: string }[];
}
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = ""; // Enable scrolling when modal is closed
  };

  return (
    <>
      <Card>
        <CardActionArea onClick={() => openModal(product)}>
          <CardContent>
            <h3 className="h5">{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </CardContent>
          <CardMedia src={product?.media?.[0]?.url} alt={product.title} />
        </CardActionArea>
      </Card>
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              <CloseIcon />
            </button>
            <h3 className="h5">{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}</p>
            {/* <img src={selectedProduct.image} alt={selectedProduct.title} /> */}
            <div className="media-container">
              {selectedProduct.media.map((item, index) => (
                <React.Fragment key={index}>
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={`${selectedProduct.title}-${index}`}
                      className="modal-media"
                    />
                  ) : (
                    <video controls className="modal-media">
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
