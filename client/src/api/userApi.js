import axiosClient from "./axiosClient";

export const getUser = () => axiosClient.get("user/");
