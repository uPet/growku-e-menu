import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { Product } from '../../model/product'
import { getProductsData } from '../../api/products-graphql'

type ProductsContextType = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const CreateProductsContext = createContext<ProductsContextType>({
  // default values
  products: [],
  setProducts: () => {},
})

const CreateProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<
  ProductsContextType['products']
  >([])

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProductsData();
        if (!productsData) return;

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
        products,
        setProducts,
    }),
    [products, setProducts]
  )

  return (
    <CreateProductsContext.Provider value={value}>
      {children}
    </CreateProductsContext.Provider>
  )
}

export const useCreateProductsContext = () => useContext(CreateProductsContext)

export default CreateProductsProvider
