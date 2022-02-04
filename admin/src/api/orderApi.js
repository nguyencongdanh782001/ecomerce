import axiosClient from "./axiosClient";

export const getAllOrder = () => axiosClient.get("order/");

export const getIncomeOrder = (id) =>
  axiosClient.get(id ? `order/income?pid=${id}` : `order/income`);
