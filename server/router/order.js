import express from "express";
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenAuthorization,
} from "../middleware/verifyToken.js";
import Order from "../model/Order.js";

const router = express.Router();

//CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    //create new order
    const newOrder = await new Order(req.body);
    //save new order
    const saveOrder = await newOrder.save();
    //response new order
    return res.json(saveOrder);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//UPDATE ORDER
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    //update order
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //response update order
    return res.json(updateOrder);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//DELETE ORDER
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    //delete order
    await Order.findByIdAndDelete(req.params.id);
    return res.send("Order has been delete.");
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET USER ORDER (FIND USER ORDER)
router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    //get order
    const order = await Order.findOne({ userId: req.params.userId });
    //response user order
    return res.json(order);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET ALL ORDER
router.get("/", verifyTokenAdmin, async (req, res) => {
  try {
    const orderList = await Order.find().sort({ createdAt: -1 });
    //response orderList
    return res.json(orderList);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res.json(income);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

export default router;
