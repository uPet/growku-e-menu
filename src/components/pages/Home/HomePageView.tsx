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

type Product = {
  title: string;
  description: string;
  price: string;
  media: { type: "image" | "video"; url: string }[];
};

const productsData: Product[] = [
  {
    title: "Tacos de Birria",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Quesabirria",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Tacos de Birria1",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Quesabirria1",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Tacos de Birria2",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Quesabirria2",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Tacos de Birria3",
    description:
      "🇲🇽 Tres tacos de carne de birria, cebolla y queso. Acompañados con caldo de birria, ensalada de lechuga y habanero. 🇺🇸 Three birria beef tacos with onion and cheese. Accompanied by birria broth, lettuce salad, and habanero.",
    price: "$16.00",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "Quesabirria3",
    description: "🇲🇽 Quesadilla con carne de birria. 🇺🇸 Birria quesadilla.",
    price: "$17.99",
    media: [
      { type: "image", url: "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=60/media/photosV2/6817cd51-854d-4934-bfa3-4508f4c88687-retina-large.jpeg" },
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
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
          {products.map((product, index) => (
            <ProductCard key={`${product.title}-${index}`} product={product} />
          ))}
        </div>
      </Menu>
    </div>
  );
};

export default HomePageView;
