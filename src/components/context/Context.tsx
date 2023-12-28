import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Category } from "../../interfaces/category";
import { Product } from "../../interfaces/product";
import { AddToCart } from "../../interfaces/add-to-cart";
import { getCategory } from "../../apis/categoryApi";
import { getProductApi } from "../../apis/productApi";
import { getAddToCartApi } from "../../apis/addToCartApi";
// import { productData } from "../../helper/tableStaticData";

interface CategoryProviderProps {
  children: ReactNode;
}

export interface ContextValue {
  categoryData: Category[];
  setCategoryData: (value: Category[]) => void;
  productData: Product[];
  setProductData: (value: Product[]) => void;
  addToCartData: AddToCart[];
  setAddToCartData: (value: AddToCart[]) => void;
}

export const DataContext = createContext<ContextValue>({
  categoryData: [],
  setCategoryData: () => null,
  productData: [],
  setProductData: () => null,
  addToCartData: [],
  setAddToCartData: () => null,
});

const Context = ({ children }: CategoryProviderProps) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);
  const [addToCartData, setAddToCartData] = useState<AddToCart[]>([]);

  const getProductCategory = async () => {
    try {
      const findData = await getCategory();
      if (findData.success) {
        setCategoryData(findData.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getProduct = async () => {
    try {
      const findData = await getProductApi();
      if (findData.success) {
        setProductData(findData.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getAddToCart = async () => {
    try {
      const findData = await getAddToCartApi();
      if (findData.success) {
        setAddToCartData(findData.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getProductCategory();
    getProduct();
    getAddToCart();
  }, []);

  const contextValue = {
    categoryData,
    setCategoryData,
    productData,
    setProductData,
    addToCartData,
    setAddToCartData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default Context;
