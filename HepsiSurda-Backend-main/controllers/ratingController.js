const Rating = require("../models/Ratings");

const createRating = async (req, res) => {
  const { user_id, product_id, rating_count } = req.body;

  try {
    const existingRating = await Rating.findOne({ user_id, product_id });

    if (existingRating) {
      return res.status(200).json({
        error: "You have already rated this product.",
      });
    }

    const rating = await Rating.create({ user_id, product_id, rating_count });
    res.status(201).json({
      message: "Rating created successfully",
      status: "OK",
      rating,
    });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Failed to create rating" });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findOne(id);
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRatingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.findByUserId(userId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRatingsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.findByProductId(productId);

    const averageRating =
      ratings.reduce((acc, rating) => acc + rating.rating_count, 0) /
      ratings.length;

    const average = ratings.length > 0 ? averageRating : 0;

    res.status(200).json({ averageRating: average, ratings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const updated = await Rating.update(id, rating);
    if (updated) {
      return res.status(200).json({ message: "Rating updated successfully" });
    }
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Failed to update rating" });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Rating.delete(id);
    if (deleted) {
      return res.status(204).json({ message: "Rating deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: "Failed to delete rating" });
  }
};

module.exports = {
  createRating,
  getAllRatings,
  getRatingById,
  getAllRatingsByUserId,
  getAllRatingsByProductId,
  updateRating,
  deleteRating,
};
