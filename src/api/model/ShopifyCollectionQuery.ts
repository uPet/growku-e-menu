import { Product as ShopifyProduct, Metafield } from "shopify-buy";

export type Price = {
  amount: number;
  currencyCode: string;
};

export type PriceRange = {
  minVariantPrice: Price;
  maxVariantPrice: Price;
};

export type ShopifyCollectionQuery = {
  node: {
    id: string;
    title: string;
    products: {
      edges: {
        node: Omit<ShopifyProduct, "media"> & {
          media: {
            nodes: {
              alt: string;
              id: string;
              mediaContentType: string;
              sources: {
                url: string;
              }[];
              originUrl: string;
              presentation: {
                id: string;
              };
              previewImage: {
                url: string;
                altText: string;
                height: number;
                id: string;
                width: number;
              };
              featuredImage: {
                altText: string;
                height: number;
                id: string;
                url: string;
                width: number;
              };
            }[];
          };
        };
      }[];
    };
    metafields: Metafield[]
  };
};
