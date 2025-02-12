export type Media = {
  id?: string;
  type: "image" | "video";
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  price: string;
  compareAtPrice: string;
  featuredImage: Media;
  media: Media[];
};
