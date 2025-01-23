const express = require("express");
const router = express.Router();

const {
  addReply,
  getAllReplies,
  getReplyById,
  getRepliesByCommentId,
  updateReply,
  deleteReply,
} = require("../controllers/repliesController");

router.get("/", getAllReplies);
router.get("/:id", getReplyById);
router.get("/comment/:comment_id", getRepliesByCommentId);
router.post("/", addReply);
router.patch("/:id", updateReply);
router.delete("/:id", deleteReply);

module.exports = router;
