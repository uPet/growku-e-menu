import React from "react";

import "./menu.css";


interface MenuProps {
  items: string[];
  selectedItem: string;
  onClick?: (item: string) => void;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  items,
  selectedItem,
  onClick,
  children,
}) => {

  return (
    <div className="menu">
      <div className="menu-list">
        {items.map((item) => (
          <div className="menu-item-wrapper">
            <h2
              key={item}
              className={`menu-item ${selectedItem === item ? "active" : ""}`}
              onClick={() => onClick?.(item)}
            >
              {item}
            </h2>
            {selectedItem === item && (
              <div className="menu-item-highlight"></div>
            )}
          </div>
        ))}
      </div>
      <div className="menu-content">
        {children}
      </div>
    </div>
  );
};

export default Menu;
