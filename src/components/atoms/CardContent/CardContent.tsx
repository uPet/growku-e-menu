import * as React from "react";

import "./cardContent.css";

export default function CardContent({
  className = "",
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`card-content ${className}`} {...rest}>
      {children}
    </div>
  );
}
