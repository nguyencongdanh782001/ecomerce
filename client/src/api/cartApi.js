import axiosClient from "./axiosClient";

export const createCart = (value) => axiosClient.post("cart/", value);
