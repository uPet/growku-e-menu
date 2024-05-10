import * as React from "react";

import "./cardActionArea.css";

export default function CardActionArea({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> ) {
  return (
    <button className={`card-action ${className}`} {...rest}>
      {children}
    </button>
  );
}
