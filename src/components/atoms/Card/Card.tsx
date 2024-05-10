import * as React from "react";

import "./card.css";

export default function Card({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={`card ${className}`} {...rest}>
        {children}
        <div className="card-line"></div>
      </div>
    </>
  );
}
