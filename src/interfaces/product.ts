import { AddToCart } from "./add-to-cart";
import { Category } from "./category";
export interface Product extends Category {
  title?: string;
  price?: number;
  categoryId?: number;
}

export interface ErrorType {
  name: string;
  title: string;
  price: number|string;
}

export type CheckExistNameFunction = () => void;

export type HandleAddButtonClickFunction = () => void;

export interface ProductContextValue {
  productData: Product[];
  setProductData: (value: Product[]) => void;
}

export interface ContextValue {
  categoryData: Category[];
  setCategoryData: (value: Category[]) => void;
  productData: Product[];
  setProductData: (value: Product[]) => void;
  addToCartData: AddToCart[],
  setAddToCartData: (value: AddToCart[]) => void;
}

export type ValidateFormType = () => boolean;

export type StoreCategoryType = () => void;
