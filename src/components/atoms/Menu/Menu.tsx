import React from "react";

import "./menu.css";


interface MenuProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  items,
  selectedItem,
  setSelectedItem,
  children,
}) => {

  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="menu">
      <div className="menu-list">
        {items.map((item) => (
          <div className="menu-item-wrapper">
            <h2
              key={item}
              className={`menu-item ${selectedItem === item ? "active" : ""}`}
              onClick={() => handleClick(item)}
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
