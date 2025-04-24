import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";
import { ProductCardType } from "../../pages/Home/HomePageView";

const BATCH_SIZE = 20;

// Util: safely schedule idle rendering
const scheduleIdle = (cb: () => void) => {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(cb);
  } else {
    setTimeout(cb, 0);
  }
};

const Products = ({
  items,
  selectedCategory,
}: {
  items: ProductCardType[];
  selectedCategory: string;
}) => {
  const [shownProductIndex, setShownProductIndex] = useState<number | null>(
    null
  );
  const [renderedItems, setRenderedItems] = useState<ProductCardType[]>([]);

  /**
   * Incrementally renders items in small batches to prevent UI blocking/crashing
   * when displaying large lists like full product catalogs.
   */
  useEffect(() => {
    let i = 0;

    setRenderedItems([]);

    function renderBatch() {
      const nextBatch = items.slice(i, i + BATCH_SIZE);
      setRenderedItems((prev) => [...prev, ...nextBatch]);
      i += BATCH_SIZE;

      if (i < items.length) {
        scheduleIdle(renderBatch);
      }
    }

    renderBatch();
  }, [items]);

  return (
    <div className="cards-wrapper">
      {renderedItems.map((product, index) => {
        const shouldBeHidden = product.category !== selectedCategory;

        return (
          <ProductCard
            shouldBeHidden={index === shownProductIndex}
            className={shouldBeHidden ? "hidden" : ""}
            shouldBeHide={shouldBeHidden}
            key={`${product.title}-${index}`}
            product={product}
            productIndex={index}
            shownProductIndex={shownProductIndex}
            setShownProductIndex={setShownProductIndex}
          />
        );
      })}
    </div>
  );
};

export default Products;
