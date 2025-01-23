const pool = require("../config/database");

class Rating {
  async create({ user_id, product_id, rating_count }) {
    const query = `
            INSERT INTO ratings (
                user_id,
                product_id,
                rating_count
            ) VALUES (
                $1, $2, $3
            )
            RETURNING *;`;

    try {
      const result = await pool.query(query, [
        user_id,
        product_id,
        rating_count,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating rating:", error);
      throw error;
    }
  }

  async findOne({ user_id, product_id }) {
    const query = `SELECT * FROM ratings WHERE user_id = $1 AND product_id = $2;`;

    try {
      const { rows } = await pool.query(query, [user_id, product_id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding rating:", error);
      throw error;
    }
  }

  async findByUserId(id) {
    const query = `SELECT * FROM ratings WHERE user_id = '${id}';`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async findByProductId(id) {
    const query = `SELECT * FROM ratings WHERE product_id = '${id}';`;
    const { rows } = await pool.query(query);
    return rows;
  }

  async update(id, rating) {
    const query = `
            UPDATE ratings
            SET rating = $1
            WHERE rating_id = $2
            RETURNING *;`;

    try {
      const result = await pool.query(query, [rating, id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating rating:", error);
      throw error;
    }
  }

  async delete(id) {
    const query = `
            DELETE FROM ratings
            WHERE rating_id = $1;`;

    try {
      await pool.query(query, [id]);
    } catch (error) {
      console.error("Error deleting rating:", error);
      throw error;
    }
  }
}

module.exports = new Rating();
