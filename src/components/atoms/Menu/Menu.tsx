import React from "react";

import "./menu.css";
import { decodeHtmlEntities } from "../../../helpers/decode-html-entities";

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
      <div aria-label="Category navigation" className="menu-list">
        {menuHeader && <div className="menu-header">{menuHeader}</div>}
        {items.map((item) => {
          const isSelected = selectedItem === item;
          const itemId = `menu-item-${item?.toLowerCase()}`;
          return (
            <div
              key={item}
              className="menu-item-wrapper"
              id={`menu-item-wrapper-${item.toLowerCase()}`}
            >
              <h2 className="category-heading">
                <button
                  id={itemId}
                  className={`text-body menu-item ${
                    isSelected ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onClick?.(item);
                  }}
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={`View ${decodeHtmlEntities(item)} category`}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={0}
                >
                  {decodeHtmlEntities(item)}
                </button>
              </h2>
              {isSelected && (
                <div className="menu-item-highlight" aria-hidden="true"></div>
              )}
            </div>
          );
        })}
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
