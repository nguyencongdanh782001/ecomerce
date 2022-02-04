import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authRedux";
import orderReducer from "../redux/orderRedux";
import productReducer from "../redux/productRedux";
import userReducer from "../redux/userRedux";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    product: productReducer,
  },
});
