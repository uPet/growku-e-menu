import React from "react";

import "./menu.css";

interface MenuProps {
  menuContentProps?: React.HTMLProps<HTMLDivElement>;
  items: string[];
  selectedItem: string;
  onClick?: (item: string) => void;
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  menuContentProps: {
    className: menuContentClassName,
    ...restMenuContentProps
  } = {},
  items,
  selectedItem,
  onClick,
  children,
}) => {

  return (
    <div className="menu">
      <div className="menu-list">
        {items.map((item) => (
          <div key={item} className="menu-item-wrapper">
            <button
              key={item}
              className={`menu-item ${selectedItem === item ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onClick?.(item);
              }}
            >
              {item}
            </button>
            {selectedItem === item && (
              <div className="menu-item-highlight"></div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`menu-content ${menuContentClassName}`}
        {...restMenuContentProps}
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
