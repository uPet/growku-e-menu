import React from "react";

import "./menu.css";

interface MenuProps {
  menuContentProps?: React.HTMLProps<HTMLDivElement>;
  items: string[];
  selectedItem: string;
  onClick?: (item: string) => void;
  children?: React.ReactNode;
  menuHeader?: React.ReactNode;
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
  menuHeader,
}) => {
  return (
    <div className="menu">
      <div className="menu-list">
        {menuHeader && <div className="menu-header">{menuHeader}</div>}
        {items.map((item) => (
          <div key={item} className="menu-item-wrapper"
          id={`menu-item-wrapper-${item?.toLocaleLowerCase()}`}
          >
            <button
              key={item}
              className={`text-body menu-item ${selectedItem === item ? "active" : ""}`}
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
        id={`menu-content-${selectedItem?.toLocaleLowerCase()}`}
        className={`menu-content ${menuContentClassName || ""}`}
        {...restMenuContentProps}
      >
        {children}
      </div>
    </div>
  );
};

export default Menu;
