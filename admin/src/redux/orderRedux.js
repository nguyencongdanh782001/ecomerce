import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/orderApi";

export const getAllOrder = createAsyncThunk(
  "order/getallorder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.getAllOrder();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getIncomeOrder = createAsyncThunk(
  "order/getincomeorder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.getIncomeOrder();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orderIncome: [],
    isLoading: true,
    isLoadingOrderIncome: true,
    error: "",
  },
  extraReducers: {
    [getAllOrder.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getAllOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [getAllOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getIncomeOrder.pending]: (state) => {
      state.isLoadingOrderIncome = true;
      state.error = "";
    },
    [getIncomeOrder.fulfilled]: (state, action) => {
      state.orderIncome = action.payload;
      state.isLoadingOrderIncome = false;
      state.error = "";
    },
    [getIncomeOrder.rejected]: (state, action) => {
      state.isLoadingOrderIncome = false;
      state.error = action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;
