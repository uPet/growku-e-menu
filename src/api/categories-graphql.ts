import { Category } from "../model/category";
import { LanguageType } from "../model/language";
import {
  PriceRange,
  ShopifyCollectionQuery,
} from "./model/ShopifyCollectionQuery";

const query = `
query collections($first: Int, $language: LanguageCode!) @inContext(language: $language) {
  collections(first: $first) {
    edges {
      node {
        id
        title
        metafields(identifiers: [
          {namespace: "custom", key: "collection_order"}
        ]) {
          id
          key
          namespace
          description
          type
          value
        }
        products(first: 100) {
          edges {
            node {
              id
              title
              description
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                altText
                height
                id
                url
                width
              }
              descriptionHtml
              handle
              media(first: 250) {
                nodes {
                  alt
                  id
                  mediaContentType
                  ... on Video {
                    alt
                    sources {
                      url
                    }
                  }
                  ... on ExternalVideo {
                    alt
                    originUrl
                  }
                  presentation {
                    id
                  }
                  previewImage {
                    url
                    altText
                    height
                    id
                    width
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const getProductPrice = (priceRange: PriceRange) => {
  if (priceRange.minVariantPrice.amount === priceRange.maxVariantPrice.amount) {
    return `${priceRange.minVariantPrice.amount} ${priceRange.minVariantPrice.currencyCode}`;
  }

  return `From ${priceRange.minVariantPrice.amount} ${priceRange.minVariantPrice.currencyCode}`;
};

const getCompareAtPrice = (compareAtPriceRange: PriceRange) => {
  if (
    Number(compareAtPriceRange.minVariantPrice.amount) === 0 ||
    Number(compareAtPriceRange.maxVariantPrice.amount) === 0
  ) {
    return "";
  }
  if (
    compareAtPriceRange.minVariantPrice.amount ===
    compareAtPriceRange.maxVariantPrice.amount
  ) {
    return `${compareAtPriceRange.minVariantPrice.amount} ${compareAtPriceRange.minVariantPrice.currencyCode}`;
  }

  return `From ${compareAtPriceRange.minVariantPrice.amount} ${compareAtPriceRange.minVariantPrice.currencyCode}`;
};

const shopifyCollectionToCategory = (
  shopifyCollection: ShopifyCollectionQuery
): Category => {
  return {
    id: shopifyCollection.node.id,
    title: shopifyCollection.node.title,
    products: shopifyCollection.node.products.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      descriptionHtml: edge.node.descriptionHtml,
      handle: edge.node.handle,
      media: edge.node.media.nodes.map((media) => ({
        id: media.id,
        type: media.mediaContentType === "VIDEO" ? "video" : "image",
        url:
          media.mediaContentType === "VIDEO"
            ? media.sources[0].url
            : media.previewImage.url,
        alt: media.alt,
        width: media.previewImage.width,
        height: media.previewImage.height,
      })),
      featuredImage: {
        id: edge.node.featuredImage?.id,
        type: "image",
        url: edge.node.featuredImage?.url,
        alt: edge.node.featuredImage?.altText,
        width: edge.node.featuredImage?.width,
        height: edge.node.featuredImage?.height,
      },
      price: getProductPrice({
        maxVariantPrice: edge.node.priceRange.maxVariantPrice,
        minVariantPrice: edge.node.priceRange.minVariantPrice,
      }),
      compareAtPrice: getCompareAtPrice({
        maxVariantPrice: edge.node.compareAtPriceRange.maxVariantPrice,
        minVariantPrice: edge.node.compareAtPriceRange.minVariantPrice,
      }),
    })),
  };
};

const sortCollections = (
  collections: ShopifyCollectionQuery[]
): ShopifyCollectionQuery[] => {
  return collections.sort((a: ShopifyCollectionQuery, b: ShopifyCollectionQuery) => {
    const orderA =
      a.node.metafields?.[0]?.key === "collection_order"
        ? parseInt(a.node.metafields?.[0].value, 10)
        : Number.MAX_SAFE_INTEGER;
    const orderB =
      b.node.metafields?.[0]?.key === "collection_order"
        ? parseInt(b.node.metafields?.[0].value, 10)
        : Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
};

export const getCategoriesData = async (
  language: LanguageType = "EN"
): Promise<Category[] | undefined> => {
  const variables = { first: 250, language };
  const response = await fetch(
    `${process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  if (
    !data.data.collections.edges ||
    data.data.collections.edges.length === 0
  ) {
    return;
  }

  const sortedCollections = sortCollections(data.data.collections.edges);

  return sortedCollections
    .filter(
      (edge: ShopifyCollectionQuery) => edge.node.products.edges.length > 0
    )
    .map((edge: ShopifyCollectionQuery) => shopifyCollectionToCategory(edge));
};
