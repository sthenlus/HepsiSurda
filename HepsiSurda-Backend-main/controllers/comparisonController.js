const Comparison = require("../models/Comparisons");

const addToComparison = async (req, res) => {
  const { productid_1, productid_2, user_id } = req.body;

  try {
    const comparison = await Comparison.create({
      productid_1,
      productid_2,
      user_id,
      isactive: true,
    });
    res.status(201).json({
      message: "Comparison added successfully",
      status: "OK",
      comparison,
    });
  } catch (error) {
    console.error("Error adding comparison:", error);
    res.status(500).json({ error: "Failed to add comparison" });
  }
};

const getAllComparisons = async (req, res) => {
  try {
    const comparisons = await Comparison.findAll();
    res.status(200).json(comparisons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComparisonById = async (req, res) => {
  try {
    const { id } = req.params;
    const comparison = await Comparison.findOne(id);
    res.status(200).json(comparison);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComparisonsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const comparisons = await Comparison.findByUserId(userId);
    res.status(200).json(comparisons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComparisonById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comparison.delete(id);
    if (deleted) {
      return res
        .status(204)
        .json({ message: "Comparison deleted successfully" });
    }
    throw new Error("Comparison not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComparison = async (req, res) => {
  try {
    const { id } = req.params;
    const { productid_1, productid_2, user_id, isactive } =
      req.body.updatedData;
    const comparison = await Comparison.update(id, {
      productid_1,
      productid_2,
      user_id,
      isactive,
    });
    console.log(comparison);
    res.status(200).json(comparison);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToComparison,
  getAllComparisons,
  getComparisonById,
  getComparisonsByUserId,
  deleteComparisonById,
  updateComparison,
};
