import { Product } from "./product";

export type Category = {
  id: string;
  title: string;
  products: Product[];
  updatedAt: string;
  banner: {
    url: string;
    columnsNumber: number;
  };
};
