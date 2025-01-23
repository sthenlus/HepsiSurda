const express = require("express");
const router = express.Router();

const {
  addToComparison,
  getAllComparisons,
  getComparisonById,
  getComparisonsByUserId,
  deleteComparisonById,
  updateComparison,
} = require("../controllers/comparisonController");

router.get("/", getAllComparisons);
router.get("/:id", getComparisonById);
router.get("/user/:userId", getComparisonsByUserId);
router.post("/", addToComparison);
router.patch("/:id", updateComparison);
router.delete("/:id", deleteComparisonById);

module.exports = router;
