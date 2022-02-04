import express from "express";
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenAuthorization,
} from "../middleware/verifyToken.js";
import Cart from "../model/Cart.js";

const router = express.Router();

//CREATE CART
router.post("/", verifyToken, async (req, res) => {
  try {
    //create new cart
    const newCart = await new Cart(req.body);
    //save new cart
    const saveCart = await newCart.save();
    //response new cart
    return res.json(saveCart);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//UPDATE CART
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    //update cart
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //response update cart
    return res.json(updateCart);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//DELETE CART
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    //delete cart
    await Cart.findByIdAndDelete(req.params.id);
    return res.send("Cart has been delete.");
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET USER CART (FIND USER CART)
router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    //get cart
    const cart = await Cart.findOne({ userId: req.params.userId });
    //response user cart
    return res.json(cart);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET ALL CART
router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const cartList = await Cart.find().sort({ createdAt: -1 });
    //response cartList
    return res.json(cartList);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

export default router;
