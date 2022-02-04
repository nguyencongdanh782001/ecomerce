import axiosClient from "./axiosClient";

export const createOrder = (value) => axiosClient.post("order/", value);
