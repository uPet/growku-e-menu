import React from "react";

function CardIcon() {
  return (
    <svg
      style={{
        scale: "1.5",
        marginBottom: "1px",
      }} // TODO: This is just to fix the svg, remove it when the svg is fixed
      id="card_icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 22"
      width="24"
      height="22"
      preserveAspectRatio="none"
      data-name="Card Icon"
      fill="var(--growku-text-heading)"
    >
      <path d="M17.91 5.65H6.08A1.82 1.82 0 0 0 4.27 7.5v7.85a1.82 1.82 0 0 0 1.81 1.81h11.83a1.82 1.82 0 0 0 1.82-1.81V7.5a1.82 1.82 0 0 0-1.82-1.85zM6.08 6.15h11.83a1.31 1.31 0 0 1 1.32 1.32v.93H4.76v-.93a1.31 1.31 0 0 1 1.32-1.32zm13.19 4.26H4.76V9.15h14.51zm-1.32 6.25H6.08a1.31 1.31 0 0 1-1.32-1.32v-4.43h14.51v4.43a1.31 1.31 0 0 1-1.32 1.32z" />
      <path d="M16.11 13.77a1.78 1.78 0 0 0-.94.28 1.76 1.76 0 0 0-.93-.28 1.75 1.75 0 1 0 .93 3.23 1.74 1.74 0 1 0 .94-3.21zm-3.11 1.73a1.26 1.26 0 0 1 2.52 0 1.25 1.25 0 0 1-.51 1 1.26 1.26 0 0 1-2-.98zm3.12 1.26a1.26 1.26 0 0 1-.54-.12l.06-.08a1.5 1.5 0 0 0 .14-.22c0-.04.04-.07.05-.11a1.78 1.78 0 0 0 .08-.23l.03-.11a1.73 1.73 0 0 0 .06-.36 1.64 1.64 0 0 0 0-.35l-.03-.11a2.25 2.25 0 0 0-.08-.24l-.05-.1a1.42 1.42 0 0 0-.14-.24l-.05-.07v-.03a1.31 1.31 0 0 1 .54-.12 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
  );
}

export default CardIcon;
