import { TableProps } from "../interfaces/table";
import { Product } from "../interfaces/product";
import axios from "axios";

const axiosInst = axios.create({
  baseURL: "http://localhost:8000"
})

export const getProductApi = async () => {
  try {
    const response = await axiosInst.get("/products");
    return { data: response.data, success: true };
  } catch (error) {
    return { data: error, success: false };
  }
};
export const postProductApi = async (data: Product) => {
  try {
    const response = await axiosInst.post("/products", data);
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};

export const updateCategoryApi = async (id: number, data: Product) => {
  try {
    const response = await axiosInst.put(
      `/products/${id}`,
      data
    );
    console.log(response,"response")
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};

export const deleteProductApi = async (id: number) => {
  try {
    const response = await axiosInst.delete(
      `/products/${id}`
    );
    console.log(response);

    if (!response.status) {
      return { data: response.data, success: false };
    }
    return { data: response.data, success: true };
  } catch (error) {
    return { data: error, success: false };
  }
};