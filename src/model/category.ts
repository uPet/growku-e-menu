import { Metafield } from "shopify-buy";
import { Product } from "./product";

export type Category = {
  id: string;
  title: string;
  products: Product[];
  metafields?: Metafield[];
};
