import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./router/auth.js";
import userRoute from "./router/user.js";
import productRoute from "./router/product.js";
import cartRoute from "./router/cart.js";
import orderRoute from "./router/order.js";
import stripeRoute from "./router/stripe.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

mongoose
  .connect(process.env.CONNECT_URL)
  .then(() => console.log("database connected successfully"))
  .catch(() => process.exit(1));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(PORT, () => {
  console.log("backend server is running");
});
