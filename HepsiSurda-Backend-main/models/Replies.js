const pool = require("../config/database");

class Reply {
  async create({ comment_id, user_id, text }) {
    const query = `
      INSERT INTO replies (
        comment_id, 
        user_id, 
        text
      ) VALUES (
        $1, $2, $3
      )
      RETURNING *;`;

    try {
      const result = await pool.query(query, [comment_id, user_id, text]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating reply:", error);
      throw error;
    }
  }

  async findAll() {
    const query = "SELECT * FROM replies;";
    const { rows } = await pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = `SELECT * FROM replies WHERE reply_id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async findByCommentId(comment_id) {
    const query = `SELECT * FROM replies WHERE comment_id = $1;`;
    const { rows } = await pool.query(query, [comment_id]);
    return rows;
  }

  async update(id, { comment_id, user_id, text }) {
    const query = `UPDATE replies SET 
        comment_id = $1, 
        user_id = $2, 
        text = $3 
        WHERE reply_id = $4;`;
    const result = await pool.query(query, [comment_id, user_id, text, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = `DELETE FROM replies WHERE reply_id = $1;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = new Reply();
