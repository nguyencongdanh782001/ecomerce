import express from "express";
import { verifyTokenAdmin } from "../middleware/verifyToken.js";
import Product from "../model/Product.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const router = express.Router();

//CREATE PRODUCT
router.post("/", verifyTokenAdmin, async (req, res) => {
  const file = req.files.image;
  let newProduct;
  try {
    await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      (error, result) =>
        //create new product
        (newProduct = new Product({
          ...req.body,
          img: { public_id: result.public_id, url: result.url },
        }))
    );
    //save new product
    const saveProduct = await newProduct.save();
    //response new product
    return res.json(saveProduct);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//UPDATE PRODUCT INFO
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  const file = req.files?.image;
  let newImage;
  try {
    if (file !== undefined) {
      const productImg = await Product.findById(req.params.id);

      await cloudinary.v2.uploader.destroy(
        productImg.img.public_id,
        (error, result) => {}
      );

      await cloudinary.v2.uploader.upload(
        file.tempFilePath,
        (error, result) =>
          //create new product
          (newImage = { public_id: result.public_id, url: result.url })
      );
      //update product info
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          img: newImage,
        },
        { new: true }
      );
      //response update product info
      return res.json(updateProduct);
    } else {
      //update product info
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      //response update product info
      return res.json(updateProduct);
    }
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    //delete product
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    await cloudinary.v2.uploader.destroy(
      deleteProduct.img.public_id,
      (error, result) => {}
    );
    return res.send({
      deleteProduct: deleteProduct,
      message: "product has been delete.",
    });
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET PRODUCT (FIND PRODUCT)
router.get("/find/:id", async (req, res) => {
  try {
    //get product
    const product = await Product.findById(req.params.id);
    //response user
    return res.json(product);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

//GET ALL PRODUCT
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qSearch = req.query.search;
  try {
    let productList;
    if (qNew) {
      productList = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      productList = await Product.find({
        categories: { $in: [qCategory] },
      }).sort({ createdAt: -1 });
    } else if (qSearch) {
      const title = new RegExp(qSearch, "i");
      productList = await Product.find({ title: title }).sort({
        createdAt: -1,
      });
    } else {
      productList = await Product.find().sort({ createdAt: -1 });
    }
    //response productList
    return res.json(productList);
  } catch (error) {
    //response error from server
    return res.status(500).send(error.message);
  }
});

export default router;
