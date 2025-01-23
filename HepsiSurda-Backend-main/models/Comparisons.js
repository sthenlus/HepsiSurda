const pool = require("../config/database");

class Comparison {
  async create({ productid_1, productid_2, user_id, isactive }) {
    const query = `INSERT INTO comparisons (productid_1, productid_2, user_id, isactive) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const values = [productid_1, productid_2, user_id, isactive];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating comparison:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM comparisons;";
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error finding comparisons:", error);
      throw error;
    }
  }

  async findOne(id) {
    const query = `SELECT * FROM comparisons WHERE comparison_id = $1;`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding comparison:", error);
      throw error;
    }
  }

  async update(id, { productid_1, productid_2, user_id, isactive }) {
    const query = `UPDATE comparisons SET productid_1 = $1, productid_2 = $2, user_id = $3, isactive = $4 WHERE comparison_id = $5 RETURNING *;`;
    const values = [productid_1, productid_2, user_id, isactive, id];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error updating comparison:", error);
      throw error;
    }
  }

  async delete(id) {
    const query = `DELETE FROM comparisons WHERE comparison_id = $1;`;
    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error deleting comparison:", error);
      throw error;
    }
  }

  async findByUserId(userId) {
    const query = `SELECT * FROM comparisons WHERE user_id = $1;`;
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error("Error finding comparisons by user ID:", error);
      throw error;
    }
  }

  async findActiveByUserId(userId) {
    const query = `SELECT * FROM comparisons WHERE user_id = $1 AND isactive = true;`;
    try {
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      console.error("Error finding active comparisons by user ID:", error);
      throw error;
    }
  }
}

module.exports = new Comparison();
