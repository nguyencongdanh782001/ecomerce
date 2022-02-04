import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isLoading: false,
    error: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.price;
    },
    decrease: (state, action) => {
      const id = state.products.findIndex(
        (value) => value.id_cart === action.payload.id
      );
      if (state.products[id].quantity > 1) {
        state.products[id].quantity -= 1;
        state.total = state.total - state.products[id].price;
      }
      state.products = [...state.products];
    },
    increase: (state, action) => {
      const id = state.products.findIndex((value) => {
        return value.id_cart === action.payload.id;
      });

      state.products[id].quantity += 1;

      state.products = [...state.products];
      state.total = state.total + state.products[id].price;
    },
    removeProduct: (state, action) => {
      const product = state.products.find(
        (item) => item.id_cart === action.payload.id
      );

      state.products = state.products.filter(
        (item) => item.id_cart !== action.payload.id
      );

      state.quantity -= 1;

      state.total = state.total - product.quantity * product.price;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increase, decrease, removeProduct, clearCart } =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
