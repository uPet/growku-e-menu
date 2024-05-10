import React, { useEffect, useRef, useState } from "react";

import Menu from "../../atoms/Menu/Menu";
import ProductCard from "../../organisms/ProductCard/ProductCard";

const categoriesList = [
  "Breakfast",
  "Antojitos",
  "Steaks",
  "Quesadillas",
  "Mexican Tacos",
  "Burritos",
];

const productsData = [
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=70/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=70/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=70/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=70/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=70/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    image:
      "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg",
  },
];

const HomePageView = () => {
  const [selectedItem, setSelectedItem] = useState(categoriesList[0]);
  const [products, setProducts] = useState(productsData.slice(0, 10));
  const menuContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (menuContentRef.current) {
      menuContentRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    setProducts(productsData.slice(0, Math.random() * 10));
  }, [selectedItem]);

  return (
    <div className="layout">
      <h1 className="page-header">La Mexicana Bar & Grill</h1>
      <Menu
        contentRef={menuContentRef}
        items={categoriesList}
        selectedItem={selectedItem}
        onClick={(item) => {
          setSelectedItem(item);
          scrollToTop();
        }}
      >
        <h2>{selectedItem}</h2>
        <div className="cards-wrapper">
          {products.map((item, index) => (
            <ProductCard key={`${item.title}-${index}`} item={item} />
          ))}
        </div>
      </Menu>
    </div>
  );
};

export default HomePageView;
