import * as React from "react";

import "./cardMedia.css";

export default function CardMedia({
  className = "",
  ...imageProps
}: {
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className={`card-media ${className}`}>
      {imageProps?.src ? (
        <img alt="" src="" {...imageProps} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
