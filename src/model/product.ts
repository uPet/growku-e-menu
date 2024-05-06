import { Category } from "./category"

export type Product = {
  id: string
  title: string
  description: string
  collections: Category[]
  descriptionHtml: string
  handle: string
}
