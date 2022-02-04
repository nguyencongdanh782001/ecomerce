import CryptoJS from "crypto-js";
import express from "express";
import {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenAuthorization,
} from "../middleware/verifyToken.js";
import User from "../model/User.js";

const router = express.Router();

//UPDATE USER INFO
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC.toString()
    );
  }
  try {
    const existingUser = await User.findOne({
      $and: [{ username: req.body.username }, { email: req.body.email }],
    });
    //check username or email existed
    if (existingUser)
      return res
        .status(409)
        .send("already have someone using username or email");
    //update user info
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //response update user info
    return res.json(updateUser);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//DELETE USER
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    //delete user
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    return res.json({ deleteUser, message: "user has been delete." });
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET A USER
router.get("/", verifyToken, async (req, res) => {
  try {
    //get user
    const user = await User.findById(req.user.id);

    const { password, ...orther } = user._doc;
    //response user
    return res.json({ ...orther });
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET USER (FIND USER)
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
  try {
    //get user
    const user = await User.findById(req.params.id);

    const { password, ...orther } = user._doc;
    //response user
    return res.json({ ...orther });
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET ALL USER
router.get("/all/", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    //get user
    const user = query
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find().sort({ createdAt: -1 });
    //response user
    return res.json(user);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET USER STATS
router.get("/stats", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(data);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

export default router;
