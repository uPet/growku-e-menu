import { Category } from "../model/category";
import { LanguageType } from "../model/language";
import { Media } from "../model/product";

export const getCategoriesData = async (
  language: LanguageType = "EN"
): Promise<Category[] | undefined> => {
  const response = await fetch(
    `${process.env.REACT_APP_WORDPRESS_SITE_URL}/wp-json/wc/v3/categories-with-products-by-sales-channel?salesChannel=e-menu&storeName=${process.env.REACT_APP_STORE_NAME}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories and products");
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Failed to fetch categories and products");
  }

  return data.map((category: any) => {
    return mapAPICategoryToModel(category);
  });
};

export const mapAPICategoryToModel = (category: any): Category => {
  return {
    id: category.id,
    title: category.name,
    updatedAt: category.updated_date,
    banner: {
      url: category.banner?.url,
      columnsNumber: Number(category.banner?.columns_number || 0),
    },
    products: category.products.map((product: any) => ({
      id: product.id,
      title: product.name,
      description: product.description,
      price: product.price,
      cashPrice: product.cash_price,
      permalink: product.permalink,
      updatedAt: product.updated_date,
      featuredImage: {
        url: product.featured_image || product.media[0]?.url,
        alt: product.name,
      },
      media: [
        ...product.media.map((media: Media) => ({
          url: media.url,
          type: media.type,
          alt: media.alt || product.name,
          width: media.width,
          height: media.height,
        })),
        {
          url: product.featured_image,
          type: "image",
          alt: product.name,
        },
      ],
    })),
  };
};
