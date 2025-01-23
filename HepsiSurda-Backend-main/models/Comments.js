const pool = require("../config/database");

class Comment {
  async create({ text, user_id, product_id }) {
    const query = `INSERT INTO comments (text, user_id, product_id) VALUES ('${text}', '${user_id}', '${product_id}') RETURNING *;`;

    try {
      const { rows } = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM comments;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = `SELECT * FROM comments WHERE comment_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async update(id, { text, user_id, product_id }) {
    const query = `UPDATE comments SET text = '${text}', user_id = '${user_id}', product_id = '${product_id}' WHERE comment_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async updateRating(id, { rating }) {
    const query = `UPDATE comments SET rating = '${rating}' WHERE comment_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM comments WHERE comment_id = ${id};`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async findByContent(text) {
    const query = `SELECT * FROM comments WHERE text = '${text}';`;
    const { rows } = await pool.query(query);
    return rows[0];
  }

  async findByProductId(id) {
    const query = `SELECT * FROM comments WHERE product_id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows;
  }
}

module.exports = new Comment();
