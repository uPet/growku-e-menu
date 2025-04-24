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

  useEffect(() => {
    let i = 0;
    let batchCount = 0;
    const startTime = performance.now();

    setRenderedItems([]);
    console.log(
      `[Products] Start progressive rendering of ${items.length} products...`
    );

    function renderBatch() {
      const nextBatch = items.slice(i, i + BATCH_SIZE);
      setRenderedItems((prev) => [...prev, ...nextBatch]);
      i += BATCH_SIZE;
      batchCount++;

      console.log(
        `[Products] Rendered batch #${batchCount}: ${nextBatch.length} items (total rendered: ${i})`
      );

      if (i < items.length) {
        scheduleIdle(renderBatch);
      } else {
        const totalTime = (performance.now() - startTime).toFixed(2);
        console.log(
          `[Products] ✅ Finished rendering all products in ${batchCount} batches. Total time: ${totalTime}ms`
        );
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
