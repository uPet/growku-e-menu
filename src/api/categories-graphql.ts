import { Category } from "../model/category";
import { LanguageType } from "../model/langauge";

const query = `
query collections($first: Int, $language: LanguageCode!) @inContext(language: $language) {
  collections(first: $first) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`;

const shopifyCollectionToCategory = (shopifyCollection: any): Category => {
  return {
    id: shopifyCollection.node.id,
    title: shopifyCollection.node.title,
  };
};

export const getCategoriesData = async (
  language: LanguageType = 'EN'
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
  if (!data.data.collections.edges|| data.data.collections.edges.length === 0) {
    return;
  }

  return data.data.collections.edges.map(shopifyCollectionToCategory);
};
