import { AddToCart } from "../interfaces/add-to-cart";
import axios from "axios";


const axiosInst = axios.create({
  baseURL: "http://localhost:8000"
})


export const getAddToCartApi = async () => {
  try {
    const response = await axiosInst.get("/cartItems");
    console.log(response.data, "---------------------------------");
    return { data: response.data, success: true };
  } catch (error) {
    return { data: error, success: false };
  }
};

export const postAddToCartApi = async (data: AddToCart) => {
  try {
    const response = await axiosInst.post("/cartItems", data);
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};

export const deleteAddToCartApi = async (id: number) => {
  try {
    const response = await axiosInst.delete(
      `/cartItems/${id}`
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

export const updateAddToCartApi = async (id: number, data: AddToCart) => {
  try {
    const response = await axiosInst.put(
      `/cartItems/${id}`,
      data
    );
    console.log(response, "response");
    return { data: response.data, success: true };
  } catch (error) {
    console.log("catch ");
    return { data: error, success: false };
  }
};
