const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const upload = require("../middlewares/multerConfig");

router.post("/", upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
