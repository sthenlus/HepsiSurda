const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { user_id, product_id, amount, quantity, features } = req.body;

  try {
    const cartItem = await Cart.create({
      user_id,
      product_id,
      amount,
      quantity,
      features,
    });
    console.log(cartItem);
    res.status(201).json({
      message: "Item added to cart successfully",
      status: "OK",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findOne(id);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCartItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.findAll(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.delete(id);
    if (deleted) {
      return res.status(204).json({ message: "Item deleted successfully" });
    }
    throw new Error("Cart item not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAllCartItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await Cart.deleteAllByUserId(userId);
    if (deleted) {
      return res.status(204).json({ message: "Items deleted successfully" });
    }
    throw new Error("Cart items not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await Cart.updateQuantity(id, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getAllCartItems,
  getCartItemById,
  getAllCartItemsByUserId,
  deleteCartItemById,
  deleteAllCartItemsByUserId,
  updateCartItemQuantity,
};
