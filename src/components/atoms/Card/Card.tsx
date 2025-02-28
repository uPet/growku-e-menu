import * as React from "react";

import "./card.css";

export type CardVariant = "default" | "featured";

export default function Card({
  children,
  className = "",
  variant = "default",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}) {
  return (
    <>
      <div className={`card card--${variant} ${className}`} {...rest}>
        {children}
      </div>
    </>
  );
}
