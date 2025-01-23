const express = require("express");
const router = express.Router();
const {
  createRating,
  getAllRatings,
  getRatingById,
  getAllRatingsByUserId,
  getAllRatingsByProductId,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");

router.post("/", createRating);
router.get("/", getAllRatings);
router.get("/:id", getRatingById);
router.get("/user/:userId", getAllRatingsByUserId);
router.get("/product/:productId", getAllRatingsByProductId);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

module.exports = router;
