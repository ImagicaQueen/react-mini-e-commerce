import { AddToCart } from "../interfaces/add-to-cart";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

export const category: string[] = ["Id", "Name", "Edit", "Delete", "Confirm"];
export const product: string[] = [
  "Id",
  "Name",
  "Title",
  "Price",
  "Edit",
  "Delete",
  "Add",
];

export const categoryData: Category[] = [
  { id: 1, name: "sellphone" },
  { id: 2, name: "cpu" },
  { id: 3, name: "mouce" },
];

export const productData: Product[] = [
  { id: 1, name: "mi", title: "this is xiaomi brand", price: 15000 },
  { id: 2, name: "realme", title: "this is realme brand", price: 5000 },
  {
    id: 3,
    name: "microphone",
    title: "this is microphone brand",
    price: 10000,
  },
];

export const productAddToCart: string[] = [
  "Id",
  "Name",
  "Title",
  "Quantity",
  "Price",
  "Total Price",
  "Inc",
  "Dec",
  "Remove",
];

export const productAddToCartData: AddToCart[] = [
  {
    id: 1,
    name: "mi",
    title: "this is xiaomi brand",
    quantity: 2,
    price: 15000,
    totalPrice: 30000,
  },
  {
    id: 2,
    name: "mi",
    title: "this is xiaomi brand",
    quantity: 2,
    price: 15000,
    totalPrice: 30000,
  },
];
