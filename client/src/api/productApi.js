import axiosClient from "./axiosClient";

export const fetchProduct = (cat) =>
  axiosClient.get(cat ? `product?category=${cat}` : `product/`);

export const searchProduct = (search) =>
  axiosClient.get(`product?search=${search}`);

export const fetchProductDetail = (id) => axiosClient.get(`product/find/${id}`);
