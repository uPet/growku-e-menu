import * as React from "react";

import "./cardContent.css";
import { CardVariant } from "../Card/Card";

export default function CardContent({
  className = "",
  children,
  variant = "default",
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
  variant?: CardVariant;
}) {
  return (
    <div
      className={`card-content card-content--${variant} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
