import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

import "./products.css";
import { ProductCardType } from "../../pages/Home/HomePageView";
import { Category } from "../../../model/category";

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
  categories,
}: {
  items: ProductCardType[];
  selectedCategory: string;
  categories: Category[];
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

  const selectedCategoryData = categories.find(
    (category) => category.title === selectedCategory
  );
  const categoryBannerImageOrVideo = selectedCategoryData?.banner.url;
  const categoryBannerColumnsNumber =
    selectedCategoryData?.banner?.columnsNumber;

  // set the banner columns number as css variable
  useEffect(() => {
    if (categoryBannerColumnsNumber) {
      document.documentElement.style.setProperty(
        "--category-banner-columns-number",
        `${categoryBannerColumnsNumber}`
      );
    }
  }, [categoryBannerColumnsNumber]);

  return (
    <div className="cards-wrapper">
      {/* TODO: Render category banner image or video */}
      {categoryBannerImageOrVideo && (
        <div
          className={`category-banner columns-${
            categoryBannerColumnsNumber ?? 1
          }`}
        >
          {categoryBannerImageOrVideo.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={categoryBannerImageOrVideo}
              autoPlay
              muted
              loop
              playsInline
              className="category-banner-video"
              crossOrigin="anonymous"
            />
          ) : (
            <img
              src={categoryBannerImageOrVideo}
              alt="Category Banner"
              className="category-banner-image"
            />
          )}
        </div>
      )}

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
