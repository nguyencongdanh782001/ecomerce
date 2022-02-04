import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/productApi";

export const fetchProduct = createAsyncThunk(
  "product/getproduct",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.fetchProduct(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "product/getproductdetail",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.fetchProductDetail(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.searchProduct(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productSearch: [],
    productDetail: {},
    isLoading: true,
    isLoadingSearch: false,
    isLoadingProductDetail: false,
    error: "",
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [searchProduct.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [searchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchProductDetail.pending]: (state) => {
      state.isLoadingProductDetail = true;
      state.error = "";
    },
    [fetchProductDetail.fulfilled]: (state, action) => {
      state.productDetail = action.payload;
      state.isLoadingProductDetail = false;
      state.error = "";
    },
    [fetchProductDetail.rejected]: (state, action) => {
      state.isLoadingProductDetail = false;
      state.error = action.payload;
    },
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
