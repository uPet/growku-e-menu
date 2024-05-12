import React, { useRef } from "react";

import "./productCard.css";

import Card from "../../atoms/Card/Card";
import CardActionArea from "../../atoms/CardActionArea/CardActionArea";
import CardMedia from "../../atoms/CardMedia/CardMedia";
import CardContent from "../../atoms/CardContent/CardContent";
import CloseIcon from "../../atoms/CloseIcon";

interface Product {
  title: string;
  description: string;
  price: string;
  media: { type: "image" | "video"; url: string }[];
}
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productModalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    // setSelectedProduct(product);
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    if (productModalRef.current) {
      productModalRef.current.style.visibility = "visible";
    }
  };

  const closeModal = () => {
    // setSelectedProduct(null);
    document.body.style.overflow = ""; // Enable scrolling when modal is closed
    if (productModalRef.current) {
      productModalRef.current.style.visibility = "hidden";
    }
  };

  return (
    <>
      <Card>
        <CardActionArea onClick={() => openModal()}>
          <CardContent>
            <h3 className="h5">{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </CardContent>
          <CardMedia src={product?.media?.[0]?.url} alt={product.title} />
        </CardActionArea>
      </Card>
      <div className="modal-overlay" ref={productModalRef} onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            <CloseIcon />
          </button>
          <h3 className="h5">{product.title}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          {/* TODO: Update the layout to "Quilted image list" layout */}
          <div className="media-container">
            {product.media.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={`${product.title}-${index}`}
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
    </>
  );
}
