import { LanguageType } from "../model/langauge";
import { Product } from "../model/product";

const query = `
query productDetails($first: Int, $language: LanguageCode!) @inContext(language: $language) {
  products(first: $first) {
    edges {
      node {
        id
        title
        description
        collections (first: 100) {
          edges {
            node {
              id
              title
            }
          }
        }
        descriptionHtml
        handle
      }
    }
  }
}
`;

const shopifyProductToProduct = (shopifyProduct: any): Product => {
  return {
    id: shopifyProduct.node.id,
    title: shopifyProduct.node.title,
    description: shopifyProduct.node.description,
    collections: shopifyProduct.node.collections.edges.map(
      (collection: any) => ({
        id: collection.node.id,
        title: collection.node.title,
      })
    ),
    descriptionHtml: shopifyProduct.node.descriptionHtml,
    handle: shopifyProduct.node.handle,
  };
};

export const getProductsData = async (
  language: LanguageType = 'EN'
): Promise<Product[] | undefined> => {
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
  if (!data.data.products.edges|| data.data.products.edges.length === 0) {
    return;
  }

  return data.data.products.edges.map(shopifyProductToProduct);
};
