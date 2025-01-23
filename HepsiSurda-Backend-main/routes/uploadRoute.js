const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const ProductModel = require("../models/Products");
const { getImages } = require("../controllers/uploadController");

router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, type, price, description, features, rating } = req.body;

    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }
    const imagePath = req.file.path;

    const newProduct = {
      name,
      type,
      price,
      description,
      features,
      rating,
      image: imagePath,
    };

    const savedProduct = await ProductModel.create(newProduct);

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product.");
  }
});

router.get("/images", getImages);

module.exports = router;
