import React, { useState } from "react";

import Menu from "../../atoms/Menu/Menu";

const categoriesList = [
  "Breakfast",
  "Antojitos",
  "Steaks",
  "Quesadillas",
  "Mexican Tacos",
  "Burritos",
];

const HomePageView = () => {
  const [selectedItem, setSelectedItem] = useState(categoriesList[0]);

  return (
    <div className="layout">
      <h1>La Mexicana Bar & Grill</h1>
      <Menu
        items={categoriesList}
        selectedItem={selectedItem}
        onClick={(item) => setSelectedItem(item)}
      >
        <h2>{selectedItem}</h2>
      </Menu>
    </div>
  );
};

export default HomePageView;
