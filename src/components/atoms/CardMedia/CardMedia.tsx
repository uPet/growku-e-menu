import * as React from "react";

import "./cardMedia.css";
import { CardVariant } from "../Card/Card";

export default function CardMedia({
  className = "",
  variant = "default",
  ...imageProps
}: {
  className?: string;
  variant?: CardVariant;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className={`card-media card-media--${variant} ${className}`}>
      {imageProps?.src ? (
        <img alt="" src="" {...imageProps} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
