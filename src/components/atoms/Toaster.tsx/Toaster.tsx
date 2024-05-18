import React, { useEffect } from "react";
import "./toaster.css";
import ErrorIcon from "../ErrorIcon";

interface ToasterProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toaster: React.FC<ToasterProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toaster ${isVisible ? "visible" : ""}`}>
      <div className="icon">
        <ErrorIcon />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Toaster;
