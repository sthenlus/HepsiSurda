const Reply = require("../models/Replies");

const addReply = async (req, res) => {
  const { comment_id, user_id, text } = req.body;
  try {
    await Reply.create({
      comment_id,
      user_id,
      text,
    });
    return res.status(201).json({
      message: "Reply added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReplies = async (req, res) => {
  try {
    const replies = await Reply.findAll();
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const reply = await Reply.findOne(id);
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRepliesByCommentId = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const replies = await Reply.findByCommentId(comment_id);
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment_id, user_id, text } = req.body;
    const reply = await Reply.update(id, {
      comment_id,
      user_id,
      text,
    });
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    await Reply.delete(id);
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addReply,
  getAllReplies,
  getReplyById,
  getRepliesByCommentId,
  updateReply,
  deleteReply,
};
