import axiosClient from "./axiosClient";

export const checkout = (value) => axiosClient.post("checkout/payment", value);
