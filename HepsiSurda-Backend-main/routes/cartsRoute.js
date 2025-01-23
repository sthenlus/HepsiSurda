const express = require("express");
const router = express.Router();

const {
  addToCart,
  getAllCartItems,
  getCartItemById,
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
} = require("../controllers/cartController");

router.get("/", getAllCartItems);
router.get("/:id", getCartItemById);
router.get("/user/:userId", getAllCartItemsByUserId);
router.post("/", addToCart);
router.delete("/:id", deleteCartItemById);
router.delete("/all/:userId", deleteAllCartItemsByUserId);
router.patch("/quantity/:id", updateCartItemQuantity);

module.exports = router;
