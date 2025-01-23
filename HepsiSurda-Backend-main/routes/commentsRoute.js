const express = require("express");
const router = express.Router();

const {
  addComment,
  getAllComments,
  getCommentById,
  getCommentByProductId,
  updateCommentRating,
} = require("../controllers/commentController");

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.get("/product/:product_id", getCommentByProductId);
router.post("/", addComment);
router.patch("/:id", updateCommentRating);

module.exports = router;
