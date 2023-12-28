import { TableProps } from "../interfaces/table";
import { Product } from "../interfaces/product";
import axios from "axios";
import { Category } from "../interfaces/category";


const axiosInst = axios.create({
  baseURL: "http://localhost:8000"
})

export const getCategory = async () => {
  try {
    const response = await axiosInst.get("/category");
    return { data: response.data, success: true };
  } catch (error) {
    return { data: error, success: false };
  }
};

export const postCategory = async (data: Category) => {
  try {
    const response = await axiosInst.post("/category", data);
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axiosInst.delete(
      `/category/${categoryId}`
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

export const updateCategoryApi = async (id: number, data: Category) => {
  try {
    const response = await axiosInst.put(
      `/category/${id}`,
      data
    );
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};
