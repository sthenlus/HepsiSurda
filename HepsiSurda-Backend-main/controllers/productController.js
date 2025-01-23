const Product = require("../models/Products");

const addProduct = async (req, res) => {
  const {
    name,
    type,
    price,
    description,
    features,
    rating,
    campaign,
    discountPercent,
  } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  try {
    const product = await Product.create({
      name,
      type,
      price,
      description,
      image: imagePath,
      features,
      rating,
      campaign,
      discountPercent,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};
