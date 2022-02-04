import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/userApi";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getUser();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isLoading: true,
    error: "",
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
